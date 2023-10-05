const backURL = 'http://localhost:8888/KOSA_Project2/task'
const frontURL = 'http://localhost:5500/KOSA_Project2_Front/HTML'

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

$(()=> {
    const $sectionObj = $('section')
    const $menus = $('nav>ul>li>a')

    $menus.click((e) => {
        alert('메뉴클릭됨')
        console.log(e.target.className)
        
        switch (e.target.className) {
            case 'maintask':
                location.href='./taskmain.html'
                break
            case 'alltask':
                ajaxHandler('GET', "./taskall.html", $sectionObj)
                break
            case 'completetask': 
                ajaxHandler('GET', "./taskcomplete.html", $sectionObj)
                break
            case 'mytask':
                ajaxHandler('GET', "./taskmy.html", $sectionObj)
                break;
            
        }
        e.preventDefault()
    })
})