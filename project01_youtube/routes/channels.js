const express = require('express');
const router = express.Router();

router.use(express.json());

let db = new Map();
let id = 1;

// "/channels"
router
  .route('/')
  // 채널 전체 조회
  .get((req, res) => {
    let { userId } = req.body;
    let channels = [];
    if (db.size && userId) {
      db.forEach((channel, id) => {
        if (channel.userId === userId) {
          channels.push(channel);
        }
      });
      if (channels.length) {
        return res.status(200).json({
          status: 200,
          channelList: channels,
        });
      }
      return notFoundChannel();
    }
    // res.status(404).json({
    //   status: 404,
    //   msg: '로그인이 필요합니다.',
    // });
    notFoundChannel();
  })
  // 채널 개별 생성
  .post((req, res) => {
    let channelData = req.body;
    if (channelData.channelTitle) {
      db.set(id++, channelData);
      return res.status(201).json({
        status: 201,
        msg: `${channelData.channelTitle} 채널 생성을 성공적으로 완료하였습니다.`,
      });
    }
    res.status(400).json({ status: 400, msg: '입력한 데이터가 없습니다.' });
  });

// "/channels/:id"
router
  .route('/:id')
  // 채널 개별 조회
  .get((req, res) => {
    const { id } = req.params;
    const channel = db.get(parseInt(id));
    if (!channel) {
      return notFoundChannel();
    }
    res.status(200).json({
      status: 200,
      channelTitle: channel.channelTitle,
      userId: channel.userId,
    });
  })
  .put((req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    const channel = db.get(id);
    if (channel) {
      const newTitle = req.body.channelTitle;
      const preChannel = channel.channelTitle;
      channel.channelTitle = newTitle;
      db.set(id, channel);
      return res.status(200).json({
        status: 200,
        msg: `${preChannel} 채널명이 ${newTitle} 채널 명으로 성공적으로 수정됐습니다.`,
      });
    }
    notFoundChannel();
  })
  .delete((req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    const channel = db.get(id);
    if (channel) {
      db.delete(id);
      return res.status(200).json({
        status: 200,
        msg: `${channel.channelTitle} 채널명이 성공적으로 삭제됐습니다.`,
      });
    }
    notFoundChannel();
  });

function notFoundChannel() {
  res.status(404).json({ status: 404, msg: '해당 채널을 찾을 수 없습니다.' });
}

module.exports = router;
