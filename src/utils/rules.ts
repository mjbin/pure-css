import type { FormItemRule } from "element-plus";
import * as _ from "lodash-es";

// 必填校验
const validateRequire = (
  _rule: FormItemRule,
  value: string,
  callback: Function
) => {
  if (!value || !value.toString().trim()) {
    return callback(new Error("请输入"));
  }
  return callback();
};

// 字符串校验
const validString = (rule: FormItemRule, value: string, callback: Function) => {
  const max = typeof rule.max !== "undefined" ? rule.max : 255;
  const required = typeof rule.required !== "undefined" ? rule.required : true;
  if (!_.isEmpty(value) && value.length > max) {
    callback(new Error(`该字段最长输入${max}`));
  }
  // Emoji 过滤
  if (!_.isEmpty(value)) {
    const type = Object.prototype.toString.call(value);
    if (type === "[object String]") {
      const flag = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g.test(value);
      if (flag) {
        return callback(new Error("输入值含有非法字符，请重新输入"));
      }
    }
  }
  if (required && _.isEmpty(value)) {
    callback(new Error("请输入"));
  }
  callback();
};

// 手机号校验
const validatePhone = (
  rule: FormItemRule,
  value: string,
  callback: Function
) => {
  const required = typeof rule.required !== "undefined" ? rule.required : false;
  // const reg =
  //   /^([1]\d{10}|([\(（]?0[0-9]{2,3}[）\)]?[-]?)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?)$/;
  const reg = /^([1]\d{10})$/;
  if (required) {
    if (_.isEmpty(value)) {
      return callback(new Error("请输入"));
    }
    if (!reg.test(value)) {
      return callback(new Error("请输入11位有效的手机号"));
    }
    callback();
  } else {
    if (_.isEmpty(value)) {
      callback();
    } else {
      if (!reg.test(value)) {
        return callback(new Error("请输入11位有效的手机号"));
      }
      callback();
    }
  }
};

// 账号校验
const validateAccount = (
  rule: FormItemRule,
  value: string,
  callback: Function
) => {
  const reg = /^[A-Za-z0-9\.\@\_]+$/;
  if (_.isEmpty(value)) {
    return callback(new Error("请输入"));
  }
  if (!reg.test(value)) {
    return callback(new Error("请输入有效的账号"));
  }
  callback();
};

/**
 * 密码校验
 * prevPwd: 表单中的旧密码
 */
const validatePwd = (
  rule: FormItemRule & { prevPwd: string | undefined },
  value: string,
  callback: Function
) => {
  const reg = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
  if (_.isEmpty(value)) {
    return callback(new Error("请输入"));
  }
  if (rule.prevPwd && value === rule.prevPwd) {
    return callback(new Error("新密码不能与旧密码相同"));
  }
  if (!reg.test(value)) {
    return callback(new Error("请输入有效的密码（字母+数字组合，至少6位）"));
  }
  callback();
};

// 正整数校验
const validPositiveInteger = (
  rule: FormItemRule,
  value: string,
  callback: Function
) => {
  if (isNaN(Number(value)) && value) {
    return callback(new Error("请输入数字"));
  }
  if (!/^[+]{0,1}(\d+)$/.test(value) || value === "0") {
    return callback(new Error("请输入正整数"));
  }
  callback();
};

// 数字非必填校验
const validNoRequiredNum = (
  rule: FormItemRule,
  value: string,
  callback: Function
) => {
  if (!value) {
    return callback();
  }
  if (!/^[+]{0,1}(\d+)$/.test(value) || value === "0") {
    return callback(new Error("请输入正整数"));
  }
  callback();
};

/**
 * 密码再次确认校验
 * prevPwd: 表单中的第一次输入密码的值
 */
const validConfirmPwd = (
  rule: FormItemRule & { prevPwd: string | undefined },
  value: string,
  callback: Function
) => {
  const reg = new RegExp(`^${rule.prevPwd}$`, "g");
  if (value === "" || value === undefined) {
    if (rule.required) {
      callback(new Error("请输入新密码"));
    } else {
      callback();
    }
  } else if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("两次密码不一致"));
  }
};

const rules = {
  required: [
    {
      required: true,
      message: "请输入",
      trigger: "change",
      validator: validateRequire
    }
  ],
  select: [{ required: true, message: "请选择", trigger: "change" }],
  // 账号校验
  validateAccount: [
    { required: true, validator: validateAccount, trigger: "change" }
  ],
  // 正整数校验
  validPositiveInteger: [
    { required: true, validator: validPositiveInteger, trigger: "change" }
  ],
  // 数字非必填校验
  validNoRequiredNum: [{ validator: validNoRequiredNum, trigger: "change" }],
  // 必填 / 非必填最大数字校验
  strMaxLength: (max: number, isRequired = true) => [
    { required: isRequired, validator: validString, trigger: "change", max }
  ],
  // 手机号校验
  validatePhone: (isRequired = true) => [
    { required: isRequired, validator: validatePhone, trigger: "change" }
  ],
  // 密码校验
  validPwd: (prevPwd: string | undefined) => [
    { required: true, validator: validatePwd, trigger: "change", prevPwd }
  ],
  // 二次密码校验
  validConfirmPwd: (prevPwd: string | undefined) => [
    { required: true, validator: validConfirmPwd, trigger: "change", prevPwd }
  ]
};
export default rules;
