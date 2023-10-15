$(() => {
    const cp=localStorage.getItem('completecp')
    const teamNo=localStorage.getItem('taskteamno')
    
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: `${backURL}/completetasklist`,
        method: 'get',
        data: `teamNo=${teamNo}&currentPage=${cp}`,
        success: (responseJSONObj) => {

            const $originTrObj = $('div.completeboard>div.completecontent>table>thead>tr')
            $originTrObj.addClass('completetask')
            const $tbodyObj = $('div.completeboard>div.completecontent>table>tbody')
            const $completetasklist = responseJSONObj.list

            const $pageObj=$('div.taskpage')
            $pageObj.empty()
            const start=responseJSONObj.startPage
            const end=responseJSONObj.endPage
            
            $completetasklist.forEach(element => {
                const $copyTrObj = $originTrObj.clone()
                $copyTrObj.empty()
                const p = element.title
                const q = element.nickname
                const r = element.hwScore
                const s = element.submitDate
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

                const $hwscoreTdObj = $('<td>')
                $hwscoreTdObj.addClass('hwscore')
                $hwscoreTdObj.append(r+"점")                
                $copyTrObj.append($hwscoreTdObj) 

                const $submitdateTdObj = $('<td>')
                $submitdateTdObj.addClass('submitdate')
                $submitdateTdObj.append(s)
                $copyTrObj.append($submitdateTdObj)

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

    $('section.taskboard>div.completeboard>div.completecontent>table').on('click', 'tbody tr.completetask', function() {
        const taskNo = $(this).data('taskNo')
        localStorage.setItem("taskNo", taskNo)
        location.href='./taskview.html?teamNo='+teamNo+'&taskNo='+taskNo
    });

    $('div.taskpage').click((e)=>{
        const pg=$(e.target).attr('class')
        const currentPage=pg.substr(2)
        if(currentPage=='gebar' || currentPage=='skpage') return false
        localStorage.setItem('completecp', currentPage)
        location.href='./taskcomplete.html?teamNo='+teamNo+'&currentPage='+currentPage
    })
})