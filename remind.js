// 使い方:
//   osascript - l JavaScript remind.js "<title>" ["<URL>"] ["<week>"] ["<list>"]
// 実行例:
//   osascript -l JavaScript remind.js "ABC001_D" "https:// ~" "2" "atcoder"
//   >> 二週間後の9:00にatcoderという名称のリストへリマインドが登録

function run(args) {
  if (args.length < 1) {
    console.log('Usage: osascript -l Javascript remind.js "<title>" ["<URL>"] ["<week>"] ["<list>"]');
    return;
  }

  const title = args[0];
  const url = args[1] || "";
  const weeks = parseInt(args[2], 10) || 2;  // 既定2週間
  const listName = args[3] || "";  // 空は既定リスト

  // N週間後の9:00を期日とする（時間の変更はここ）
  const due = new Date();
  due.setDate(due.getDate() + weeks * 7);
  due.setHours(9, 0, 0, 0);
  
  const Reminders = Application("Reminders");

  let list = Reminders.defaultList();
  if (listName) {
    const match = Reminders.lists().find((l) => l.name() == listName);
    if (match) list = match;
  }

  const reminder = Reminders.Reminder({
    name:          title,
    body:          url,
    dueDate:       due,
    remindMeDate:  due,  // これで指定時刻に通知が飛ぶ
  });

  list.reminders.push(reminder);

  console.log(`登録: ${title} 期日: ${due.toLocaleString()} リスト: ${list.name()}`);
}
