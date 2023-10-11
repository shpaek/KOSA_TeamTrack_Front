$(()=>{
    const backURL = 'http://localhost:8888/KOSA_Project2'
    const frontURL = 'http://localhost:5500/HTML'


    // ---- 메뉴 클릭 시 발생 이벤트 ----

    $('ul.myteamtab>li>a[name=active]').click(()=>{
        location.href=`${frontURL}/myteamlist.html`
    })

    $('div.infomenu>ul>li>a[name=editpwd]').click(()=>{
        //location.href=`${frontURL}/mypwd.html`
    })

})