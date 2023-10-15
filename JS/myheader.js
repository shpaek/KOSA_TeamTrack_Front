$(()=>{
    const backURL = 'http://localhost:8888/teamtrack'
    const frontURL = 'http://localhost:5500/HTML'


    // ---- 메뉴 클릭 시 발생 이벤트 ----

    $('nav>ul>li>a[name=myinfo]').click(()=>{
        location.href=`${frontURL}/myinfo.html`
    })

    $('nav>ul>li>a[name=myteam]').click(()=>{
        location.href=`${frontURL}/myteamlist.html`
    })

    $('nav>ul>li>a[name=withdrawl]').click(()=>{
        location.href=`${frontURL}/deleteaccount.html`
    })

})