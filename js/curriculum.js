/* ================= Chương trình học: phiên bản, nguồn đối chiếu, metadata từ vựng =================
   File này KHÔNG sửa dữ liệu 506 thẻ trong data-hsk1.js. Nó gắn thêm metadata lên từng từ khi trang tải
   và cung cấp số liệu chương trình được TÍNH từ dữ liệu (không ghi cứng). */
(function(){
const A=window.App;

/* ---------- phiên bản chương trình ---------- */
const VERSIONS={
  'GF0025-2021-L1':{
    id:'GF0025-2021-L1',
    name:'HSK 3.0 – GF0025-2021',
    standard:'GF0025-2021 · Chuẩn trình độ tiếng Trung trong giáo dục tiếng Trung quốc tế',
    level:1,
    goal:'Học từ vựng và kiến thức nền tảng cấp 1',
    note:'Đây là bộ dữ liệu tham chiếu theo danh sách từ GF0025-2021, không mặc định đồng nhất với đề cương thi HSK mới.'
  }
};
const CURRENT='GF0025-2021-L1';

/* ---------- nguồn đối chiếu ----------
   Danh sách chữ dưới đây lấy từ bộ dữ liệu cộng đồng complete-hsk-vocabulary (drkameleon),
   file wordlists/exclusive/new/1.json, commit 7ac65bf (23/03/2026), tải và đối chiếu ngày 25/11/2026.
   Đây là bản số hóa của bên thứ ba, không phải văn bản gốc của tiêu chuẩn. */
const REFERENCE={
  name:'complete-hsk-vocabulary (drkameleon) · HSK 3.0 cấp 1',
  url:'https://github.com/drkameleon/complete-hsk-vocabulary',
  file:'wordlists/exclusive/new/1.json',
  commit:'7ac65bf',
  checkedAt:'2026-11-25',
  words:'爱 爱好 八 爸 爸爸 吧 白 白天 百 班 半 半年 半天 帮 帮忙 包 包子 杯 杯子 北 北边 北京 本 本子 比 别 别的 别人 病 病人 不 不大 不对 不客气 不用 菜 茶 差 常 常常 唱 唱歌 车 车票 车上 车站 吃 吃饭 出 出来 出去 穿 床 次 从 错 打 打车 打电话 打开 打球 大 大学 大学生 到 地 地点 地方 地上 地图 的 得到 等 弟 弟弟 第 第二 点 电 电话 电脑 电视 电视机 电影 电影院 东 东边 东西 动 动作 都 读 读书 对 对不起 多 多少 饿 儿子 二 饭 饭店 房间 房子 放 放假 放学 飞 飞机 非常 分 风 干 干净 干什么 高 高兴 告诉 哥 哥哥 歌 个 给 跟 工人 工作 关 关上 贵 国 国家 国外 过 还 还是 还有 孩子 汉语 汉字 好 好吃 好看 好听 好玩儿 号 喝 和 很 后 后边 后天 花 话 坏 回 回答 回到 回家 回来 回去 会 火车 机场 机票 鸡蛋 几 记 记得 记住 家 家里 家人 间 见 见面 叫 教 教学楼 介绍 姐 姐姐 今年 今天 进 进来 进去 九 就 觉得 开 开车 开会 开玩笑 看 看病 看到 看见 考 考试 渴 课 课本 课文 口 块 快 来 来到 老 老人 老师 了 累 冷 里 里边 两 零 六 楼 楼上 楼下 路 路口 路上 妈 妈妈 马路 马上 吗 买 慢 忙 毛 没 没关系 没什么 没事儿 没有 妹 妹妹 门 门口 门票 们 米饭 面包 面条儿 名字 明白 明年 明天 拿 哪 哪儿 哪里 哪些 那 那边 那儿 那里 那些 奶 奶奶 男 男孩儿 男朋友 男人 男生 南 南边 难 呢 能 你 你们 年 您 牛奶 女 女儿 女孩儿 女朋友 女人 女生 旁边 跑 朋友 票 七 起 起床 起来 汽车 前 前边 前天 钱 钱包 请 请假 请进 请问 请坐 球 去 去年 热 人 认识 认真 日 日期 肉 三 山 商场 商店 上 上班 上边 上车 上次 上课 上网 上午 上学 少 身上 身体 什么 生病 生气 生日 十 时候 时间 事 试 是 是不是 手 手机 书 书包 书店 树 谁 水 水果 睡 睡觉 说 说话 四 送 岁 他 他们 她 她们 太 天 天气 听 听到 听见 听写 同学 图书馆 外 外边 外国 外语 玩儿 晚 晚饭 晚上 网上 网友 忘 忘记 问 我 我们 五 午饭 洗 洗手间 喜欢 西 西边 下 下班 下边 下车 下次 下课 下午 下雨 先 先生 现在 想 小 小孩儿 小姐 小朋友 小时 小学 小学生 笑 写 谢谢 新 新年 星期 星期日 星期天 行 休息 学 学生 学习 学校 学院 要 也 页 爷爷 一 一半 一边 一点儿 一会儿 一块儿 一起 一下儿 一些 一样 衣服 医生 医院 用 有 有的 有名 有时 有时候 有些 有一些 有用 右 右边 雨 元 远 月 再 再见 在 在家 早 早饭 早上 怎么 站 找 找到 这 这边 这儿 这里 这些 着 真 真的 正 正在 知道 知识 中 中国 中间 中文 中午 中学 中学生 重 重要 住 准备 桌子 字 子 走 走路 最 最好 最后 昨天 左 左边 坐 坐下 做'.split(' ')
};
const REFSET=new Set(REFERENCE.words);

/* Những từ web ghi pinyin khác bộ tham chiếu vì theo quy ước dạy học (không phải lỗi):
   - 'bien-dieu': ghi theo biến điệu thực tế của 一 / 不 (bộ tham chiếu ghi thanh gốc).
   - 'khinh-thanh': ghi khinh thanh cho bổ ngữ phương hướng / phương vị (bộ tham chiếu ghi thanh gốc). */
const PINYIN_NOTES={
  '不客气':'bien-dieu','不对':'bien-dieu','不大':'bien-dieu','不用':'bien-dieu','是不是':'bien-dieu',
  '一半':'bien-dieu','一会儿':'bien-dieu','一边':'bien-dieu','一样':'bien-dieu','一起':'bien-dieu',
  '一块儿':'bien-dieu','一点儿':'bien-dieu','一下儿':'bien-dieu','一些':'bien-dieu','有一些':'bien-dieu',
  '西边':'khinh-thanh','北边':'khinh-thanh','这边':'khinh-thanh','进来':'khinh-thanh','进去':'khinh-thanh',
  '出来':'khinh-thanh','出去':'khinh-thanh','车上':'khinh-thanh','网上':'khinh-thanh','关上':'khinh-thanh'
};
const NOTE_TEXT={'bien-dieu':'Ghi theo biến điệu của 一/不 khi đọc','khinh-thanh':'Ghi khinh thanh như khi nói tự nhiên'};

/* ---------- gắn metadata lên từng từ (giữ nguyên h, p, m, U) ---------- */
const slug=s=>s.normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/đ/gi,'d').toLowerCase().replace(/[^a-z0-9]+/g,'_').replace(/^_|_$/g,'');
A.UNITS.forEach(u=>{
  const cat=slug(u.t);
  u.words.forEach(w=>{
    w.id='gf1_'+w.h;
    w.unit=w.U;
    w.curriculum=CURRENT;
    w.level=1;
    w.category=cat;
    const inRef=REFSET.has(w.h);
    w.sourceStatus=inRef?'matched-reference':'unverified';
    w.isSupplementary=!inRef;
    if(PINYIN_NOTES[w.h])w.pinyinNote=PINYIN_NOTES[w.h];
  });
});

/* ---------- số liệu chương trình (tính từ dữ liệu) ---------- */
function stats(){
  const all=A.ALLWORDS, ids=new Set(all.map(w=>w.h));
  return {
    total:all.length,
    unique:ids.size,
    duplicates:all.length-ids.size,
    matched:all.filter(w=>w.sourceStatus==='matched-reference').length,
    supplementary:all.filter(w=>w.isSupplementary).length,
    refTotal:REFERENCE.words.length,
    refMissing:REFERENCE.words.filter(h=>!ids.has(h)).length,
    pinyinNoted:all.filter(w=>w.pinyinNote).length,
    units:A.UNITS.length
  };
}

A.CURRICULUM={VERSIONS,CURRENT,version:VERSIONS[CURRENT],REFERENCE,PINYIN_NOTES,NOTE_TEXT,stats};
})();
