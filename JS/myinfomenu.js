$(()=>{
    const backURL = 'http://localhost:8888/teamtrack'
    const frontURL = 'http://localhost:5500/HTML'


    // ---- 내정보 수정 ----
    $('div.infomenu>ul>li>a[name=editinfo]').click(()=>{
        location.href=`${frontURL}/myinfo.html`
    })

    // ---- 비밀번호 수정 ----
    $('div.infomenu>ul>li>a[name=editpwd]').click(()=>{
        location.href=`${frontURL}/mypwd.html`
    })

    // ---- 회원 탈퇴하기 ----
    $('div.infomenu>a').click(()=>{
        location.href=`${frontURL}/deleteaccount.html`
    })

})