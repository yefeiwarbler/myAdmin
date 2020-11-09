import Mock from "mockjs";
import "./userMock.js";
import "./statisticMock.js";

// 模拟接口延时
Mock.setup({
    timeout: '600-1200'
});