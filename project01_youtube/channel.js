const express = require('express');
const app = express();
app.listen(3001);
app.use(express.json());

let db = new Map();
let id = 1;

// "/channels"
app
  .route('/channels')
  // 채널 전체 조회
  .get((req, res) => {
    let channels = [];
    if (db.size) {
      db.forEach((channel) => {
        channels.push(channel);
      });
      return res.status(201).json({
        status: 200,
        channelList: channels,
      });
    }
    res.status(404).json({
      status: 404,
      msg: '채널을 찾을 수 없습니다.',
    });
  })
  // 채널 개별 생성
  .post((req, res) => {
    const channelData = req.body;
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
app
  .route('/channels/:id')
  .get((req, res) => {
    const { id } = req.params;
    const channel = db.get(parseInt(id));
    if (!channel) {
      return res.status(404).json({
        status: 404,
        msg: `채널을 찾을 수 없습니다.`,
      });
    }
    res.status(200).json({
      status: 200,
      msg: channel.channelTitle,
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
      return res.status(201).json({
        status: 201,
        msg: `${preChannel} 채널명이 ${newTitle} 채널 명으로 성공적으로 수정됐습니다.`,
      });
    }
    res.status(404).json({ status: 404, msg: '해당 채널을 찾을 수 없습니다.' });
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
    res.status(404).json({ status: 404, msg: '해당 채널을 찾을 수 없습니다.' });
  });
