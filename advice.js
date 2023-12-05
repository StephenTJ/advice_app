async function get_advice(){
    try{
        let advice_data = await fetch("https://api.adviceslip.com/advice");
        if(advice_data.status==200){
            advice_data_json=await advice_data.json();
            advice_text=advice_data_json['slip']['advice'];
            document.getElementById("advice_text").innerText=advice_text;
            store_item(advice_text);
        }else{
            console.log("Server Error");
        }
    }catch(e){
        console.log("failed to fetch advice, ",e.message);
    }
}

async function search_advice(search_text){
    try{
        let search_data = await fetch("https://api.adviceslip.com/advice/search/"+search_text);
        if(search_data.status == 200){
            search_data_json = await search_data.json();
            return await search_data_json['slips'];
        }
    }catch(e){
        console.log("failed to search advice, ",e.message);
    }
}
async function searchText(){
    let search_value=document.getElementById("search_text").value;
    let advice_list= await search_advice(search_value);
    let result="";
    for(let i=0;i<advice_list.length;i++){
        result+="<li class=\"list-group-item list_items\">"+(i+1)+". "+advice_list[i]['advice']+"</li>";
    }
    document.getElementById("search_advice_list").innerHTML=result;
}


function store_item(advice_text){
    let advice_data_json = localStorage.getItem("advice_list_key");
    if(advice_data_json==null){
        localStorage.setItem("advice_list_key","[]");
        advice_data_json=localStorage.getItem("advice_list_key");
    }
    advice_data_list=JSON.parse(advice_data_json);
    advice_data_list.push(advice_text);
    localStorage.setItem("advice_list_key",JSON.stringify(advice_data_list));
    render_list(get_store_items());
}
function render_list(advice_list){
    let s=new Set(advice_list)
    advice_list=[...s];
    let l = advice_list.length;
    let result_list="";
    for(let i=l-1;i>=0;i--){
        let index=l-i;
        result_list+="<li class=\"list-group-item list_items\">"+index+". "+advice_list[i]+"</li>";
    }
    document.getElementById("advice_text_list").innerHTML=result_list;
}
function get_store_items(){
    let advice_data_json = localStorage.getItem("advice_list_key");
    if(advice_data_json==null){
        localStorage.setItem("advice_list_key","[]");
        advice_data_json=localStorage.getItem("advice_list_key");
    }
    advice_data_list=JSON.parse(advice_data_json);
    return advice_data_list;
}

render_list(get_store_items())


