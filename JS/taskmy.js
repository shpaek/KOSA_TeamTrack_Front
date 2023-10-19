$(() => {
    const cp=localStorage.getItem('mycp')
    const teamNo=localStorage.getItem('taskteamno')
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: `${backURL}/mytasklist`,
        method: 'get',
        data: `teamNo=${teamNo}&currentPage=${cp}`,
        success: (responseJSONObj) => {
            if(responseJSONObj.msg != undefined){
                alert('과제가 존재하지 않습니다.')
                return
            }

            const $originTrObj = $('div.myboard>div.mycontent>table>thead>tr')
            $originTrObj.addClass('mytask')
            const $tbodyObj = $('div.myboard>div.mycontent>table>tbody')
            const $mytasklist = responseJSONObj.list

            const $pageObj=$('div.taskpage')
            $pageObj.empty()
            const start=responseJSONObj.startPage
            const end=responseJSONObj.endPage
            
            $mytasklist.forEach(element => {
                const $copyTrObj = $originTrObj.clone()
                $copyTrObj.empty()
                const p = element.title
                const q = element.avgReviewscore
                const r = element.regdate
                const no=element.taskNo
                $copyTrObj.data('taskNo', no);
                
                const $titleTdObj = $('<td>')
                $titleTdObj.addClass('title')
                $titleTdObj.append(p)
                $copyTrObj.append($titleTdObj)

                const $avgreviewscoreTdObj = $('<td>')
                $avgreviewscoreTdObj.addClass('avg_reviewscore')
                $avgreviewscoreTdObj.append(q+"점")                
                $copyTrObj.append($avgreviewscoreTdObj)

                const $regdateTdObj = $('<td>')
                $regdateTdObj.addClass('regdate')
                $regdateTdObj.append(r)
                $copyTrObj.append($regdateTdObj)

                $tbodyObj.append($copyTrObj)
            });

            const $copyTrObj = $originTrObj.clone()
            $copyTrObj.empty()
            
            $tbodyObj.append($copyTrObj)

            if(start>1) {
                let page=`<span class="pg${start-1}" style="color: rgb(78, 78, 78); font-size:medium;">이전</span>&nbsp;&nbsp;`
                $pageObj.html($pageObj.html()+page)
            }
            
            $pageObj.html($pageObj.html()+'<span class="pagebar">|</span>')
            for(let i=start;i<=end;i++) {
                if(cp==i) {
                    let page=`<span class="pg${i}">&nbsp;&nbsp;<strong>${i}</strong>&nbsp;&nbsp;</span><span class="pagebar">|</span>`
                    $pageObj.html($pageObj.html()+page)
                }
                else {
                    let page=`<span class="pg${i}" style="color: rgb(78, 78, 78);">&nbsp;&nbsp;${i}&nbsp;&nbsp;</span><span class="pagebar">|</span>`
                    $pageObj.html($pageObj.html()+page)
                }
            }

            if(end!=responseJSONObj.totalPage) {
                let page=`<span class="pg${end+1}" style="color: rgb(78, 78, 78); font-size:medium;">&nbsp;&nbsp;다음</span>`
                $pageObj.html($pageObj.html()+page)
            }

        }, 
        error: ()=>{
            Swal.fire({
                icon: 'warning',
                text: '권한이 없습니다.'
              })
              location.href='./teammain.html?teamNo='+teamNo+'&id='+localStorage.getItem('loginedId')
        }
    })

    $('section.taskboard>div.myboard>div.mycontent>table').on('click', 'tbody tr.mytask', function() {
        const taskNo = $(this).data('taskNo')
        localStorage.setItem("taskNo", taskNo)
        location.href='./taskview.html?teamNo='+teamNo+'&taskNo='+taskNo
    });

    $('div.taskpage').click((e)=>{
        const pg=$(e.target).attr('class')
        const currentPage=pg.substr(2)
        if(currentPage=='gebar' || currentPage=='skpage') return false
        localStorage.setItem('mycp', currentPage)
        location.href='./taskmy.html?teamNo='+teamNo+'&currentPage='+currentPage
    })
})