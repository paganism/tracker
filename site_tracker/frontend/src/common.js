export default class Common{
    // common functions

    checkIsEmpty(data) {
        if (!data) {
            return true
        }
        return false
    }

    getName(pk, field, array)  {
        array.forEach((item) => {
            if (item.pk === pk) {
              return item.username;
            }
            console.log(item.username);
            });
    }
}
