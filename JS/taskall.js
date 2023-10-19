$(() => {
    const cp=localStorage.getItem('allcp')
    const teamNo=localStorage.getItem('taskteamno')
    console.log(teamNo)
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: `${backURL}/alltasklist`,
        method: 'get',
        data: `teamNo=${teamNo}&currentPage=${cp}`,
        success: (responseJSONObj) => {
            const $originTrObj = $('div.allboard>div.allcontent>table>thead>tr')
            $originTrObj.addClass('alltask')
            const $tbodyObj = $('div.allboard>div.allcontent>table>tbody')
            const $alltasklist = responseJSONObj.list

            const $pageObj=$('div.taskpage')
            $pageObj.empty()
            const start=responseJSONObj.startPage
            const end=responseJSONObj.endPage

            
            $alltasklist.forEach(element => {
                const $copyTrObj = $originTrObj.clone()
                $copyTrObj.empty()
                const p = element.title
                const q = element.nickname
                const r=element.regdate
                const no=element.taskNo
                $copyTrObj.data('taskNo', no);
                

                const $nicknameTdObj = $('<td>')
                $nicknameTdObj.addClass('nickname')
                $nicknameTdObj.append(q)                
                $copyTrObj.append($nicknameTdObj)
                
                const $titleTdObj = $('<td>')
                $titleTdObj.addClass('title')
                $titleTdObj.append(p)
                $copyTrObj.append($titleTdObj)

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
                let page=`&nbsp;&nbsp;<span class="pg${end+1}" style="color: rgb(78, 78, 78); font-size:medium;">다음</span>`
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

    $('section.taskboard>div.allboard>div.allcontent>table').on('click', 'tbody tr.alltask', function() {
        const taskNo = $(this).data('taskNo')
        localStorage.setItem("taskNo", taskNo)
        location.href='./taskview.html?teamNo='+teamNo+'&taskNo='+taskNo
    });

    $('div.taskpage').click((e)=>{
        const pg=$(e.target).attr('class')
        const currentPage=pg.substr(2)
        if(currentPage=='gebar' || currentPage=='skpage') return false
        localStorage.setItem('allcp', currentPage)
        location.href='./taskall.html?teamNo='+teamNo+'&currentPage='+currentPage
    })
})