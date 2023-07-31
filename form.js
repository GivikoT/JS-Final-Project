const formFunctions = {
  start() {
    formFunctions.addListeners();
  },

  addListeners() {
    let form = document.sampleForm;
    let fullName = document.getElementById("fullname");
    let username = document.getElementById("username");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let cnfPass = document.getElementById("confirmPassword");
    let phone = document.getElementById("phone");

    // ------------------------------Change Listeners------------------------------

    fullName.addEventListener("change", formFunctions.nameCheck);
    username.addEventListener("change", formFunctions.userCheck);
    email.addEventListener("change", formFunctions.emailCheck);
    phone.addEventListener("change", formFunctions.phoneCheck);
    cnfPass.addEventListener("change", formFunctions.cnPassCheck);

    // ------------------------------Typing Listeners------------------------------
    password.addEventListener("input", formFunctions.passCheck);

    // ------------------------------Form Submission------------------------------
    form.addEventListener("submit", formFunctions.validate);
  },

  nameCheck(e) {
    let fullName = e.target;
    fullName.setCustomValidity("");
    fullName.classList.add("err");
    let current = fullName.checkValidity();

    if (current) {
      let nameReg = /^(John|Jane)$/i;
      if (nameReg.test(fullName.value) === false) {
        fullName.setCustomValidity("Please write down either Jane or John");
        fullName.reportValidity();
      } else {
        fullName.classList.remove("err");
      }
    }
  },

  userCheck(e) {
    let username = e.target;
    username.setCustomValidity("");
    username.classList.add("err");
    let current = username.checkValidity();

    if (current) {
      let nameReg = /^(Mr|Mrs)\s[a-zA-Z]+/i;
      if (nameReg.test(username.value) === false) {
        username.setCustomValidity(
          "Please use either 'Mr' or 'Mrs' at the beginning of the username, followed by at least one letter"
        );

        username.reportValidity();
      } else {
        username.classList.remove("err");
      }
    }
  },

  emailCheck(e) {
    let email = e.target;
    email.setCustomValidity("");
    email.classList.add("err");
    let current = email.checkValidity();

    if (current) {
      let myRegx = /@yahoo.com$/i;
      if (myRegx.test(email.value) === false) {
        email.setCustomValidity("Please enter a valid yahoo email address.");
        email.reportValidity();
      } else {
        email.classList.remove("err");
      }
    }
  },
  passCheck(e) {
    let req = [
      {
        id: "lower",
        regex: /(?=.*[a-z])/,
        message: "Please include at least one lowercase letter",
      },
      {
        id: "upper",
        regex: /(?=.*[A-Z])/,
        message: "Please include at least one uppercase letter",
      },
      {
        id: "length",
        regex: /(?=.{10,})/,
        message: "Please write down at least 10 characters ",
      },
    ];

    let password = e.target;
    password.setCustomValidity("");
    let current = password.checkValidity();

    if (current) {
      req.forEach(({ id, regex, message }) => {
        let element = document.getElementById(id);
        if (regex.test(password.value)) {
          element.classList.add("valid");
        } else {
          element.classList.remove("valid");
          password.setCustomValidity(message);
          password.reportValidity();
          return;
        }
      });
    } else if (current || password.validity.valueMissing) {
      req.forEach(({ id, regex, message }) => {
        let element = document.getElementById(id);
        element.classList.remove("valid");
        password.setCustomValidity(message);
        password.reportValidity();
        return;
      });
    }
  },

  cnPassCheck(e) {
    let password = document.getElementById("password");
    let cnfPass = e.target;
    cnfPass.classList.add("err");
    cnfPass.setCustomValidity("");

    if (password.value !== cnfPass.value) {
      cnfPass.setCustomValidity("Passwords do not match");
      cnfPass.reportValidity();
    } else {
      cnfPass.classList.remove("err");
    }
  },

  phoneCheck(e) {
    let phone = e.target;
    phone.setCustomValidity("");
    phone.classList.add("err");
    let current = phone.checkValidity();

    if (current) {
      let myRegex = /^\+995\d{9}$/;
      if (myRegex.test(phone.value) === false) {
        phone.setCustomValidity(
          "Please enter your phone number starting with +995 followed by your 6 digit number without any space (e.g +995xxxxxx)"
        );
        phone.reportValidity();
      } else {
        phone.classList.remove("err");
      }
    }
  },

  validate(e) {
    let inputs = document.querySelectorAll("input");
    for (let input of inputs) {
      if (!input.checkValidity()) {
        e.preventDefault();
        input.classList.add("err");
      }
    }
  },
};

document.addEventListener("DOMContentLoaded", formFunctions.start);
