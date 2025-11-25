# GAS admin directory sdk

> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.

> [!NOTE]
> Userful information wao!

```java
function createNewGroup(email, name, description) {
  // グループ作成に必要なリソースオブジェクト
  const groupResource = {
    // 必須
    'email': email,
    'name': name,
    
    // オプション
    'description': description || 'GASで作成されたグループ',
  };

  try {
    // AdminDirectory.Groups.insert() を使用してグループを作成
    const newGroup = AdminDirectory.Groups.insert(groupResource);
    
    Logger.log('✅ グループが正常に作成されました: ' + newGroup.email);
    Logger.log('グループID: ' + newGroup.id);
    
    return newGroup;
    
  } catch (e) {
    // エラー処理
    Logger.log('❌ グループ作成中にエラーが発生しました: ' + e.toString());
    
    // Admin権限がない、メールアドレスが既に存在、ドメインが正しくないなどの可能性がある
    if (e.message && e.message.includes("Domain not found")) {
      Logger.log("ヒント: ドメインが存在しないか、AdminDirectory APIが有効化されていません。");
    } else if (e.message && e.message.includes("Entity already exists")) {
      Logger.log("ヒント: 指定されたメールアドレスは既に存在します。");
    }
    
//    throw new Error('グループ作成に失敗しました: ' + e.message);
  }
}
```
