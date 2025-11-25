# GAS admin directory sdk

> [!NOTE] 
> Userful information wao!



## グループを作成する

クラス単位でGoogleDriveへのアクセス制限をかけたりしたいので、グループを作成しています。
手作業では面倒なので**GAS**で解決する方法をメモ。

```java
function createNewGroup() {
  // 登録したいグループのデータを作成する
  const newGroupData = {
    'email': "waowao@suwa.tokai.ed.jp",
    'name': "わおわお",
    'desctiption': "ここにグループの説明"
  }

  try
  {
    //-----処理-----//
    const newGroup = AdminDirectory.Groups.insert(newGroupData);
    Logger.log("グループが正常に作成されました。" + newGroup.email);
  }
  catch (e)
  {
    //-----エラー-----//
    Logger.log("グループが作れませんでした。");
    Logger.log(e.message);
  }
}
```
