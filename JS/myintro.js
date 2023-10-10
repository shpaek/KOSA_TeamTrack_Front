
$(()=>{
    const backURL = 'http://localhost:8888/KOSA_Project2'
    const frontURL = 'http://localhost:5500/HTML'
    const urlParams = new URL(location.href).searchParams
    const teamNo = urlParams.get('teamNo')

    $sectionObj = $('section.section')


    //---- 작성 버튼 클릭했을 때 발생할 이벤트 ----
    $('div.myinfo').on('click',(e)=>{
        ajaxHandler('GET', `${frontURL}/myinfo.html`, $sectionObj )
    })
})