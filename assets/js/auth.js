import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
// Firestoreを追加
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBkPhZUbUUushG8GWYj9OR03Bc4VcM-HwQ",
    authDomain: "mathdrugsfun.firebaseapp.com",
    projectId: "mathdrugsfun",
    storageBucket: "mathdrugsfun.firebasestorage.app",
    messagingSenderId: "710952567531",
    appId: "1:710952567531:web:b83be8daab3e6a6cc6b4ae",
    measurementId: "G-7TRKZFL7VH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Firestore初期化
const provider = new GoogleAuthProvider();

// 要素の取得
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const userInfo = document.getElementById('user-info');
const userName = document.getElementById('user-name');
const userAvatar = document.getElementById('user-avatar');

// マイページ用要素
const mypageContent = document.getElementById('mypage-content');
const loginAlert = document.getElementById('login-alert');
const nicknameInput = document.getElementById('nickname-input');
const saveBtn = document.getElementById('save-nickname-btn');
const displayEmail = document.getElementById('display-email');
const saveMessage = document.getElementById('save-message');
const birthdayInput = document.getElementById('birthday-input');

async function updateUserInfo(user) {
  if (user) {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    let displayName = user.displayName;

    if (userDoc.exists()) {
      const data = userDoc.data();
      if (data.nickname) displayName = data.nickname;
      
      // マイページにいる場合、保存されている生年月日を表示
      if (birthdayInput) {
        birthdayInput.value = data.birthday || "";
      }
    }

    userName.textContent = displayName;
    userAvatar.src = user.photoURL;
    loginBtn.style.display = 'none';
    userInfo.style.display = 'flex';

    if (displayEmail) displayEmail.textContent = user.email;
    if (nicknameInput && userDoc.exists()) {
      nicknameInput.value = userDoc.data().nickname || "";
    }
    if (mypageContent) {
      mypageContent.style.display = 'block';
      loginAlert.style.display = 'none';
    }
  } else {
    // ログアウト処理
    loginBtn.style.display = 'block';
    userInfo.style.display = 'none';
    if (mypageContent) {
      mypageContent.style.display = 'none';
      loginAlert.style.display = 'block';
    }
  }
}

// 保存処理の修正
if (saveBtn) {
  saveBtn.addEventListener('click', async () => {
    const user = auth.currentUser;
    if (user) {
      const newNickname = nicknameInput.value;
      const newBirthday = birthdayInput.value; // 生年月日を取得
      const userEmail = user.email;            // Google Authからメールアドレスを取得

      try {
        // Firestoreに保存（メールアドレスも一緒に保存）
        await setDoc(doc(db, "users", user.uid), {
          nickname: newNickname,
          birthday: newBirthday,
          email: userEmail,       // ここでデータベースに保存されます
          updatedAt: new Date()
        }, { merge: true });
        
        saveMessage.textContent = "プロフィールの更新が完了しました！";
        userName.textContent = newNickname || user.displayName;
        setTimeout(() => saveMessage.textContent = "", 3000);
      } catch (e) {
        console.error("Error saving: ", e);
        alert("保存に失敗しました。");
      }
    }
  });
}



// 状態監視
onAuthStateChanged(auth, (user) => {
    updateUserInfo(user);
});

// ログイン・ログアウト
loginBtn.addEventListener('click', () => signInWithPopup(auth, provider));
logoutBtn.addEventListener('click', () => signOut(auth));

