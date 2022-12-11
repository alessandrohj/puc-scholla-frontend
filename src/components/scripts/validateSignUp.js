export default function validateField( type, item) {
    const maxLength = 70;
    const emailRegex = new RegExp(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "gm"
    );

    switch(type) {
        case 'name':
            if (item.length >= 2 && item.length <= maxLength) {
                return true;
            } else {
                return false;
            }
     case 'email':
        if (
          emailRegex.test(item) &&
          item.length >= 5 &&
          item.length <= maxLength
          ) {
            return true;
          } else {
            return false;
          }
          case "password":
            if (password.length >= 5 && password.length <= maxLength) {
              return true;
            } else {
              return false;
            }
}
}