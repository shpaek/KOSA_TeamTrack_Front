$(()=>{
    const backURL = 'http://192.168.1.20:8888/teamtrack'
    const frontURL = 'http://192.168.1.20:5500/HTML'
    const loginedId = sessionStorage.getItem("loginedId")


    // ---- 메뉴 클릭 시 발생 이벤트 ----

    $('nav>ul>li>a[name=myinfo]').click(()=>{
        location.href=`${frontURL}/myinfo.html?loginedId=${loginedId}`
    })

    $('nav>ul>li>a[name=myteam]').click(()=>{
        location.href=`${frontURL}/myteamlist.html?loginedId=${loginedId}`
    })

    $('nav>ul>li>a[name=withdrawl]').click(()=>{
        location.href=`${frontURL}/deleteaccount.html?loginedId=${loginedId}`
    })

})