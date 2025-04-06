document.addEventListener("DOMContentLoaded",function(){
    const searchButton=document.getElementById("search-btn");
    const usernameInput=document.getElementById("user-input");
    const statsContainer=document.querySelector(".stats-container");
    const easyProgressCircle=document.querySelector(".easy-progress");
    const mediumProgressCircle=document.querySelector(".medium-progress");
    const hardProgressCircle=document.querySelector(".hard-progress");
    const easyLabel=document.getElementById("easy-label");
    const mediumLabel=document.getElementById("medium-label");
    const hardLabel=document.getElementById("hard-label");
    const cardStatsContainer=document.querySelector(".stats-cards");

//     // return true or false based on regex
    function validateUsername(username){
        if(username.trim()===""){
            alert("username should not be empty");
        return false;
        }

        const regex=/^[a-zA-Z0-9_-]+$/;
        const isMatching=regex.test(username);
        if(!isMatching){
            alert("invalid username");
        }
        return isMatching;
    
    }

    async function fetchUserDetails(username){
        const url=`https://leetcode-stats-api.herokuapp.com/${username}`;

        try{
            searchButton.textContent="searching....";
            searchButton.disabled=true;

            const response=await fetch(url);
            if(!response.ok){
                throw new Error("unable to fetch the user details");
            }

            const parseddata=await response.json();
            console.log("logging data:",parseddata);
            displayUserData(parseddata);
        }
        catch(error){
           statsContainer.innerHTML=`<p>NO DATA FOUND</p>`

        }
        finally{
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }

        }

        function updateProgress(solved, total, label, circle) {
            const progressDegree = total > 0 ? Math.round((solved / total) * 100) : 0;
            circle.style.setProperty("--progress-degree", `${progressDegree}%`);
            label.textContent = `${solved}/${total}`;
        }
        

        

        function displayUserData(parseddata){
            const totalQues=parseddata.totalQuestions;
            const totalEasyQues=parseddata.totalEasy;
            const totalMediumQues=parseddata.totalMedium;
            const totalhardQues=parseddata.totalHard;

        
        
            const solvedtotalQues=parseddata.totalSolved;
            const solvedtotalEasyQues=parseddata.easySolved;
            const solvedtotalMediumQues=parseddata.mediumSolved;
            const solvedtotalhardQues=parseddata.hardSolved;


            updateProgress(solvedtotalEasyQues,totalEasyQues,easyLabel,easyProgressCircle);
            updateProgress(solvedtotalMediumQues,totalMediumQues,mediumLabel,mediumProgressCircle);
            updateProgress(solvedtotalhardQues,totalhardQues,hardLabel,hardProgressCircle);

            cardStatsContainer.innerHTML = `
            
            <div class="card">Easy Solved : ${parseddata.easySolved}</div>
            <div class="card">Medium Solved : ${parseddata.mediumSolved}</div>
            <div class="card">Hard Solved : ${parseddata.hardSolved}</div>
            <div class="card">Total Solved: ${parseddata.totalSolved}</div>
        `;
        
        }




    
        

    searchButton.addEventListener('click',function(){
        const username=usernameInput.value;
        console.log("logging username:",username);
        if(validateUsername(username)){
            fetchUserDetails(username);
        }

    })
    
})




