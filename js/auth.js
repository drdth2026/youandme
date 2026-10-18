/**
 * YOU & ME - DR. TEA CLINIC (BS. PHAM TAN TRA)
 * ADMIN AUTHENTICATION & ACCESS CONTROL MODULE
 */

const DEFAULT_ADMIN_USER = 'admin';
const DEFAULT_ADMIN_PASS = 'drtea2026';

function getAdminSession() {
  try {
    const sessionStr = sessionStorage.getItem(ADMIN_AUTH_KEY) || localStorage.getItem(ADMIN_AUTH_KEY);
    if (!sessionStr) return null;
    const session = JSON.parse(sessionStr);
    if (session && session.isLoggedIn && session.token) {
      return session;
    }
  } catch (e) {
    console.error('Lỗi khi đọc phiên đăng nhập:', e);
  }
  return null;
}

function isAdminLoggedIn() {
  return getAdminSession() !== null;
}

function loginAdmin(username, password, rememberMe = false) {
  const u = (username || '').trim().toLowerCase();
  const p = (password || '').trim();

  // Accept 'admin' or doctor's email
  const validUser = (u === DEFAULT_ADMIN_USER || u === 'drtea@youandme.clinic' || u === 'drdth2026@gmail.com');
  const validPass = (p === DEFAULT_ADMIN_PASS);

  if (validUser && validPass) {
    const sessionData = {
      isLoggedIn: true,
      username: u,
      displayName: 'BS. Phạm Tấn Trà (Dr. Tea)',
      role: 'Quản trị viên Y khoa',
      token: 'TEA_SECURE_TOKEN_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      loggedInAt: new Date().toLocaleString('vi-VN')
    };

    if (rememberMe) {
      localStorage.setItem(ADMIN_AUTH_KEY, JSON.stringify(sessionData));
    } else {
      sessionStorage.setItem(ADMIN_AUTH_KEY, JSON.stringify(sessionData));
    }

    renderAdminGateUI();
    if (typeof showCmsNotification === 'function') {
      showCmsNotification('Đăng nhập Quản trị viên thành công! Chào mừng BS. Phạm Tấn Trà.');
    }
    return { success: true };
  }

  return { success: false, message: 'Tên đăng nhập hoặc mật khẩu không chính xác. Vui lòng thử lại!' };
}

function logoutAdmin() {
  sessionStorage.removeItem(ADMIN_AUTH_KEY);
  localStorage.removeItem(ADMIN_AUTH_KEY);
  renderAdminGateUI();
  if (typeof showCmsNotification === 'function') {
    showCmsNotification('Đã đăng xuất khỏi phiên làm việc Quản trị viên!', 'info');
  }
}

function handleAdminLoginFormSubmit(e) {
  if (e) e.preventDefault();
  const userEl = document.getElementById('adminLoginUser');
  const passEl = document.getElementById('adminLoginPass');
  const rememberEl = document.getElementById('adminLoginRemember');
  const errorEl = document.getElementById('adminLoginError');

  const username = userEl ? userEl.value : '';
  const password = passEl ? passEl.value : '';
  const remember = rememberEl ? rememberEl.checked : false;

  const res = loginAdmin(username, password, remember);
  if (!res.success) {
    if (errorEl) {
      errorEl.textContent = res.message;
      errorEl.classList.remove('hidden');
    }
  } else {
    if (errorEl) {
      errorEl.classList.add('hidden');
    }
    // Re-render CMS content
    if (typeof renderCmsArticleManager === 'function') renderCmsArticleManager();
    if (typeof renderSheetRecordsManager === 'function') renderSheetRecordsManager();
    if (typeof renderCmsChatInbox === 'function') renderCmsChatInbox();
  }
}

function toggleAdminPasswordVisibility() {
  const passEl = document.getElementById('adminLoginPass');
  const iconEl = document.getElementById('adminLoginEyeIcon');
  if (passEl) {
    if (passEl.type === 'password') {
      passEl.type = 'text';
      if (iconEl) iconEl.textContent = '🙈';
    } else {
      passEl.type = 'password';
      if (iconEl) iconEl.textContent = '👁️';
    }
  }
}

function renderAdminGateUI() {
  const loginGate = document.getElementById('cmsLoginGate');
  const cmsContent = document.getElementById('cmsMainContent');
  const adminBar = document.getElementById('cmsAdminBar');
  const adminName = document.getElementById('cmsAdminDisplayName');

  const loggedIn = isAdminLoggedIn();
  const session = getAdminSession();

  if (loggedIn && session) {
    if (loginGate) loginGate.classList.add('hidden');
    if (cmsContent) cmsContent.classList.remove('hidden');
    if (adminBar) adminBar.classList.remove('hidden');
    if (adminName) adminName.textContent = session.displayName;
  } else {
    if (loginGate) loginGate.classList.remove('hidden');
    if (cmsContent) cmsContent.classList.add('hidden');
    if (adminBar) adminBar.classList.add('hidden');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderAdminGateUI();
});
