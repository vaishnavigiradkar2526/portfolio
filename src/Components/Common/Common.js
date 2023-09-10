import AppStore from "../../Configs/index";

const numDifferentiation = (val, point, short = false, isRaw = false) => {
  if (isNaN(val) || !val) return 0;

  // point += 1
  val = Math.round(val);

  if (isRaw) return addCommas(val);

  if (val >= 10000000) {
    val = (val / 10000000).toFixed(point);
    // val = val.length > 4 ? val.slice(0, 4) : val
    val = parseFloat(val) + (short ? " Cr" : " Crore");
  } else if (val >= 100000) {
    val = (val / 100000).toFixed(point);
    // val = val.length > 4 ? val.slice(0, 4) : val
    val = parseFloat(val) + (short ? " Lkh" : " Lakh");
  } else {
    val = parseFloat(val).toFixed(0);
    val = (val + "").replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
  }
  return val;
};

const addCommas = (nStr) => {
  return nStr.toString().replace(/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g, "$1,");
};

const removeCommas = (numWidCommas) => {
  return numWidCommas.replace(/[,]/g, "");
};

const downloadFile = (url, fileName) => {
  var element = document.createElement("a");
  element.setAttribute("href", url);
  element.setAttribute("target", "_blank");
  element.setAttribute("download", fileName);
  element.setAttribute("type", "application/pdf");
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

const numConvert = (n) => {
  let ord = ["st", "nd", "rd"];
  let exceptions = [11, 12, 13];
  let nth =
    ord[(n % 10) - 1] === undefined || exceptions.includes(n % 100)
      ? "th"
      : ord[(n % 10) - 1];
  return n + nth;
};

const scrollToClass = (target, position = "center") => {
  var element = document.getElementsByClassName(target)[0];
  element.scrollIntoView({ behavior: "smooth", block: position });
};

const scrollToTargetHorizon = (target) => {
  console.info("ScrollToTarget :", target);
  target.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center",
  });
};

const scrollToClassHorizon = (target, ref) => {
  var element = document.querySelector(`.${target}`);
  console.info("ScrollToClass :", element);
  element.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center",
  });
};

const scrollToId = (target) => {
  var element = document.getElementById(target);
  element.scrollIntoView({ behavior: "smooth", block: "center" });
};

const scrollToRef = (ref) => {
  ref.current.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "start",
  });
};





const capitalize = (str) => {
  try {
    return str[0].toUpperCase() + str.slice(1);
  } catch {
    return str;
  }
};

const scrollPatch = (type) => {
  setTimeout(() => {
    try {
      var contentWrapper = document.getElementsByTagName("body")[0];
      if (contentWrapper.hasAttribute("style")) {
        contentWrapper.style.overflow = type;
      }
    } catch {}
  }, 1000);
};

const GrabToHScroll = (target) => {
  const slider = document.querySelector(`.${target}`);
  console.info("GrabToHScroll :", slider);
  let mouseDown = false;
  let startX, scrollLeft;
  let startDragging = function (e) {
    mouseDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  };
  let stopDragging = function (event) {
    mouseDown = false;
    if (slider.classList.contains("Grabbing"))
      slider.classList.remove("Grabbing");
    slider.classList.add("Grab");
  };
  slider.addEventListener("mousemove", (e) => {
    e.preventDefault();
    if (!mouseDown) {
      return;
    }
    if (slider.classList.contains("Grab")) slider.classList.remove("Grab");
    slider.classList.add("Grabbing");
    const x = e.pageX - slider.offsetLeft;
    const scroll = x - startX;
    slider.scrollLeft = scrollLeft - scroll;
  });
  slider.addEventListener("mousedown", startDragging, false);
  slider.addEventListener("mouseup", stopDragging, false);
  slider.addEventListener("mouseleave", stopDragging, false);
};

const numWords = (input) => {
  const a = [
    "",
    "one ",
    "two ",
    "three ",
    "four ",
    "five ",
    "six ",
    "seven ",
    "eight ",
    "nine ",
    "ten ",
    "eleven ",
    "twelve ",
    "thirteen ",
    "fourteen ",
    "fifteen ",
    "sixteen ",
    "seventeen ",
    "eighteen ",
    "nineteen ",
  ];
  const b = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];
  const regex = /^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/;
  const getLT20 = (n) => a[Number(n)];
  const getGT20 = (n) => b[n[0]] + " " + a[n[1]];

  const num = Number(input);
  if (input <= 999999999) {
    if (isNaN(num)) return "";
    if (num === 0) return "zero";
    const numStr = num.toString();
    if (numStr.length > 9) {
      throw new Error("overflow"); // Does not support converting more than 9 digits yet
    }
    const [, n1, n2, n3, n4, n5] = ("000000000" + numStr)
      .substr(-9)
      .match(regex); // left pad zeros
    let str = "";
    str += n1 != 0 ? (getLT20(n1) || getGT20(n1)) + "crore " : "";
    str += n2 != 0 ? (getLT20(n2) || getGT20(n2)) + "lakh " : "";
    str += n3 != 0 ? (getLT20(n3) || getGT20(n3)) + "thousand " : "";
    str += n4 != 0 ? getLT20(n4) + "hundred " : "";
    str += n5 != 0 && str != "" ? "and " : "";
    str += n5 != 0 ? getLT20(n5) || getGT20(n5) : "";
    let res = str.trim();
    return res;
  } else {
    return "";
  }
};

const numToSup = (number) => {
  if (number === 1) {
    return "1<sup>st</sup>";
  } else if (number === 2) {
    return "2<sup>nd</sup>";
  } else if (number === 3) {
    return "3<sup>rd</sup>";
  } else {
    return `${number}<sup>th</sup>`;
  }
};

const modeAlias = (value) => {
  if (value === "Monthly") {
    return "p.m.";
  } else if (value === "Half-Yearly") {
    return "half-yearly";
  } else if (value === "Yearly") {
    return "p.a.";
  } else {
    return "";
  }
};



//Masking Common Function
const mask = (value) => {
  const data = value.split("");
  var len = data.length;
  var newarr = [];
  for (var i = 0; i <= len - 1; i++) {
    if (i == 0 || i == 1 || i == len - 1) {
      newarr[i] = data[i];
    } else {
      newarr[i] = "X";
    }
  }
  const response = newarr.toString().replace(/,/g, "");
  return response;
};

const maskData = (value) => {
  const dob = value.split("/");
  const data =
    dob[0] +
    "/XX" +
    "/XXX" +
    dob[2].substring(dob[2].length - 1, dob[2].length);
  return data;
};

const maskMobile = (value) => {
  const mob = value.toString().split("");
  const maskedmob = mob[0] + mob[1] + "XXXXXXX" + mob[9];
  return maskedmob;
};

const maskEmail = (value) => {
  const mail = value.split("@");
  const provider = mail[1].split(".");
  const name = mask(mail[0]);
  const mailprovider0 = mask(provider[0]);
  const mailprovider1 = mask(provider[1]);
  console.log(name, "@", provider);
  const maskedMail = name + "@" + mailprovider0 + "." + mailprovider1;
  return maskedMail.toLowerCase();
};

const HideLandingLoader = () => {
  document.querySelector(".Spinner_Background").style.display = "none";
  var spinner = document.querySelector("body").classList;
  if (spinner.contains("Spinner_Default")) spinner.remove("Spinner_Default");
  document.querySelector("html").style.overflow = "";
  AppStore.setLandingLoader(false);
};








const AppFormFunctions = (flag) => {
  var isResume = flag === 1;
  console.warn("Looping Ropes...");
  if (
    typeof window.UserDataJSON === "object" &&
    typeof window.PopulateAppForm === "function" &&
    typeof window.Messageorder_cust === "object" &&
    typeof window.configFieldsInfo === "object" &&
    typeof window.Service_OCR === "function"
  ) {
    return true;
  } else {
    return false;
  }
};

const ToggleBootstrapStyle = (enable, count = 0) => {
  var allTags = document.querySelectorAll("link[href*='bootstrap.min.css']");
  console.warn("AllTags :", allTags, count);

  if (!enable) {
    if (allTags.length > 0) {
      allTags.forEach((e) => {
        e.setAttribute("disabled", "");
      });
    } else {
      count = count + 1;
      if (count < 100) {
        setTimeout(ToggleBootstrapStyle, 100, enable, count);
      }
    }
  } else {
    allTags.forEach((e) => {
      e.removeAttribute("disabled");
    });
  }
};

const debounce = (Func, DELAY) => {
  clearTimeout(Func._delay);
  Func._delay = setTimeout(() => {
    Func();
  }, DELAY);
};

export {
  numDifferentiation,
  removeCommas,
  addCommas,
  downloadFile,
  numConvert,
  scrollToClassHorizon,
  scrollToTargetHorizon,
  scrollToClass,
  scrollToId,
  scrollToRef,
  capitalize,
  scrollPatch,
  GrabToHScroll,
  numWords,
  numToSup,
  modeAlias,
  HideLandingLoader,
  maskData,
  maskEmail,
  maskMobile,
  AppFormFunctions,
  ToggleBootstrapStyle,
  debounce,
};
