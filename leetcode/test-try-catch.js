const getUid = async () => {
    let user_id = '';
    try {
      user_id = JSON.parse('{"d2')
    } catch (error) {
      //本地调试
        user_id =  '123';
    }
    return user_id;
  };
  

const a = getUid().then(v => {
    console.log(v)
})
