function ajaxHandler(method, u, target) {
    console.log(u)
    
    if(method == 'GET'){
        target.load(u,  function( response, status, xhr ) {
            if ( status == "error" ) {
                alert(xhr.status + xhr.statusText)
            }
        })
    }
}

$(()=>{
    const $menus = $('div.taskboardmenu>ul>li>a')

    $menus.click((e) => {
        switch (e.target.className) {
            case 'maintask':
                location.href='./taskboard.html'
                break
            case 'alltask':
                location.href='./taskall.html'
                break
            case 'completetask': 
                location.href='./taskcomplete.html'
                break
            case 'mytask':
                location.href='./taskmy.html'
                break
        }
        e.preventDefault()
    })
})