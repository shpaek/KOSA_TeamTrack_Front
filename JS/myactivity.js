
$(()=>{
    const backURL = 'http://192.168.1.20:8888/teamtrack'
    const frontURL = 'http://192.168.1.20:5500/HTML'
    const urlParams = new URL(location.href).searchParams
    const teamNo = urlParams.get('teamNo')
    const loginedId = sessionStorage.getItem("loginedId")

    function draw(max, classname, colorname){
        var i=1;
         var func1 = setInterval(function(){
           if(i<max){
               color1(i,classname,colorname);
               i++;
           } else{
             clearInterval(func1);
           }
         },10);
     }
     function color1(i, classname,colorname){
        $(classname).css({
             "background":"conic-gradient("+colorname+" 0% "+i+"%, #ffffff "+i+"% 100%)"
        });
     }
  
    $.ajax({
        url: backURL+'/myactivity',
        method : 'get',
        data : `teamNo=${teamNo}&loginedId=${loginedId}`,
        success: (responseJSONObj)=>{
            const r = responseJSONObj

            $('div.teaminfo>span.teamname').text(r.team.teamName)
            $('div.teaminfo>span.onoffline').text(r.team.onOffLine)
            $('div.teaminfo>span.joinmember').text(r.team.joinMember+' 명')
            $('div.teaminfo>span.briefinfo').text(r.team.briefInfo)

            $('div.date>span.startdate').text(r.team.startDate)
            $('div.date>span.enddate').text(r.team.endDate)

            $('div.my>span.id').text(r.teammember.id)
            $('div.my>span.nickname').text(r.teammember.nickname)
            $('div.my>span.joindate').text(r.teammember.joinDate)

            if(r.teammember.bestRank==null || r.teammember.bestRank==0.00){
                $('div.rank>span.best').text('-')
            }else{
                $('div.rank>span.best').text(r.teammember.bestRank)
            }

            if(r.teammember.rankAvg==null || r.teammember.rankAvg==0){
                $('div.rank>span.avg').text('-')
            }else{
                $('div.rank>span.avg').text(r.teammember.rankAvg)
            }

            draw(r.teammember.attendanceRate, 'div.attendance', '#ccc')
            $('div.attendance>span.a').text(r.teammember.attendanceRate+'%')
            draw(r.teammember.taskCompleteRate, 'div.taskcomplete', '#8b22ff')
            $('div.taskcomplete>span.t').text(r.teammember.taskCompleteRate+'%')
            
            const joinMember = r.team.joinMember
            const briefInfo = r.team.briefInfo
            const startdate = r.team.startdate
            const enddate = r.team.enddate
            const id = r.teammember.id
            const nickname = r.teammember.nickname
            const bestrank = r.teammember.bestrank
            const rankAvg = r.teammember.rankAvg
            const attendanceRate = r.teammember.attendanceRate
            const taskCompleteRate = r.teammember.taskCompleteRate

        },
        error:(jqXHR, textStatus)=>{
            Swal.fire({
                icon: 'error',
                text: '다시 한번 시도해주세요🙏'
            })
        }
    })
})