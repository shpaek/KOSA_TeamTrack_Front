$(() => {
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: `${backURL}/maintasklist`,
        method: 'get',
        success: (responseJSONObj) => {
            if(responseJSONObj.msg != undefined){
                alert('과제가 존재하지 않습니다.')
                return
            }

            const $originTrObj = $('div.mainboard>div.maincontent>table>thead>tr')
            $originTrObj.addClass('maintask')
            const $tbodyObj = $('div.mainboard>div.maincontent>table>tbody')
            
            responseJSONObj.forEach(element => {
                const $copyTrObj = $originTrObj.clone()
                $copyTrObj.empty()
                const p = element.title
                const q = element.nickname
                const s = element.enddate
                // console.log(q)
                
                const $nicknameTdObj = $('<td>')
                $nicknameTdObj.addClass('nickname')
                $nicknameTdObj.append(q)                
                $copyTrObj.append($nicknameTdObj)  
                
                const $titleTdObj = $('<td>')
                $titleTdObj.addClass('title')
                $titleTdObj.append(p)
                $copyTrObj.append($titleTdObj)

                const $enddateTdObj = $('<td>')
                $enddateTdObj.addClass('enddate')
                $enddateTdObj.append(s)
                $copyTrObj.append($enddateTdObj)

                $tbodyObj.append($copyTrObj)
            });

            const $copyTrObj = $originTrObj.clone()
            $copyTrObj.empty()
            
            $tbodyObj.append($copyTrObj)

        }
    })

    const $createtaskmenu = $('section.taskboard>div.mainboard>div.maincontent>table>tbody td.createtd>div.createbox')
    $createtaskmenu.click((e) =>{
        $.ajax({
            xhrFields: {
              withCredentials: true
          },
          url: `${backURL}/chktaskid`,
          method: 'get',
          success: (responseJSONObj) => {
            if(responseJSONObj.status==0) {
                Swal.fire({
                    icon: 'question',
                    title: '과제 생성 불가',
                    text: responseJSONObj.msg
                  })
              //alert(responseJSONObj.msg)
            } else if(responseJSONObj.status==1) {
              //alert('성공')
              localStorage.setItem("loginedId", responseJSONObj.msg)
              location.href='./taskcreate.html'
            }
          }
          })
    })

    $('section.taskboard>div.mainboard>div.maincontent>table').on('click', 'tbody tr.maintask', function() {
        location.href='./taskexam.html'
    });
})