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
Userful information wao!

## グループを作成する

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
