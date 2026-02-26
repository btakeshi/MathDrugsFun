---
layout: default
title: マイページ
permalink: /mypage/
---

# プロフィール設定

<div id="mypage-content" style="display: none;">
  <p>ログイン中のアドレス: <span id="display-email"></span></p>
  
  <div style="margin: 20px 0;">
    <label for="nickname-input" style="display:block; margin-bottom:5px;">ニックネーム:</label>
    <input type="text" id="nickname-input" style="padding: 8px; width: 100%; max-width: 300px; margin-bottom: 15px;">

    <!-- 生年月日入力の追加 -->
    <label for="birthday-input" style="display:block; margin-bottom:5px;">生年月日:</label>
    <input type="date" id="birthday-input" style="padding: 8px; width: 100%; max-width: 300px; margin-bottom: 20px;">
    
    <br>
    <button id="save-nickname-btn" class="btn-login" style="background-color: #fff4e6; color: #d9480f; border: 1px solid #ffd8a8; padding: 10px 20px; border-radius: 8px; cursor: pointer;">設定を保存する</button>
  </div>
  
  <p id="save-message" style="color: green; font-weight: bold;"></p>
</div>

<div id="login-alert">
  <p>このページを表示するにはログインが必要です。</p>
</div>
