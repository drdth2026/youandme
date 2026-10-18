/**
 * YOU & ME - DR. TEA CLINIC (BS. PHAM TAN TRA)
 * SERVER-SIDE GOOGLE SHEETS PROXY API ADAPTER
 * Endpoint is securely configured on the server and NEVER exposed on the client UI.
 */

const SERVER_API_ENDPOINT = '/api/sheet-proxy';

async function sendConsultToServerProxy(consultData) {
  try {
    const resp = await fetch(SERVER_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(consultData)
    });

    if (resp.ok) {
      const result = await resp.json();
      return { success: true, result };
    }
  } catch (err) {
    console.warn('Server proxy /api/sheet-proxy chưa sẵn sàng hoặc đang chạy offline/static:', err);
  }

  // Fallback: If user is running via file:/// and has server.config.json in the same folder
  try {
    const cfgResp = await fetch('server.config.json');
    if (cfgResp.ok) {
      const cfg = await cfgResp.json();
      if (cfg && cfg.googleSheetWebAppUrl && !cfg.googleSheetWebAppUrl.includes('REPLACE_WITH')) {
        await fetch(cfg.googleSheetWebAppUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(consultData)
        });
        return { success: true, fallback: true };
      }
    }
  } catch (e) {
    // Silent fallback
  }

  return { success: false, offline: true };
}

async function fetchRecordsFromServerProxy() {
  try {
    const resp = await fetch(SERVER_API_ENDPOINT + '?action=read');
    if (resp.ok) {
      const data = await resp.json();
      if (data && data.result === 'success' && Array.isArray(data.records)) {
        return { success: true, records: data.records };
      }
    }
  } catch (err) {
    console.warn('Không thể kết nối đến Server proxy /api/sheet-proxy?action=read:', err);
  }

  // Fallback direct read if server.config.json is accessible
  try {
    const cfgResp = await fetch('server.config.json');
    if (cfgResp.ok) {
      const cfg = await cfgResp.json();
      if (cfg && cfg.googleSheetWebAppUrl && !cfg.googleSheetWebAppUrl.includes('REPLACE_WITH')) {
        const fetchUrl = cfg.googleSheetWebAppUrl + (cfg.googleSheetWebAppUrl.includes('?') ? '&' : '?') + 'action=read';
        const sheetResp = await fetch(fetchUrl);
        if (sheetResp.ok) {
          const sheetData = await sheetResp.json();
          if (sheetData && sheetData.result === 'success' && Array.isArray(sheetData.records)) {
            return { success: true, records: sheetData.records, fallback: true };
          }
        }
      }
    }
  } catch (e) {}

  return { success: false, records: [] };
}

async function pingServerProxy() {
  try {
    const resp = await fetch(SERVER_API_ENDPOINT + '?action=ping');
    if (resp.ok) {
      const data = await resp.json();
      return {
        online: true,
        sheetConfigured: data.sheetConfigured !== false,
        message: data.message || 'Máy chủ đang hoạt động & Google Sheet Web App đã được kết nối tự động!'
      };
    }
  } catch (e) {}

  // Check server.config.json fallback
  try {
    const cfgResp = await fetch('server.config.json');
    if (cfgResp.ok) {
      const cfg = await cfgResp.json();
      const hasUrl = cfg && cfg.googleSheetWebAppUrl && !cfg.googleSheetWebAppUrl.includes('REPLACE_WITH');
      return {
        online: true,
        sheetConfigured: hasUrl,
        message: hasUrl
          ? 'Đã phát hiện file cấu hình server.config.json (Chế độ Server cục bộ).'
          : 'Đã kết nối server.config.json nhưng bạn cần cập nhật URL Google Sheet vào file.'
      };
    }
  } catch (e) {}

  return {
    online: false,
    sheetConfigured: false,
    message: 'Máy chủ backend chưa được khởi chạy (Chạy server.ps1 hoặc server.js để kích hoạt proxy).'
  };
}
