document.addEventListener("DOMContentLoaded", function(event) 
{
    var input = document.getElementById("newitem");

    input.addEventListener("keyup", function(event) 
    {
        event.preventDefault();
        if(event.keyCode == 13) 
        {
            newElement();
        }
    });

    newElement = () => 
    {
        let inputTask = input.value;

        if(inputTask != "")
        {
            let inNode = document.createTextNode(inputTask);
            let id = Date.now();
            let li = document.createElement("li");

            let text = document.createElement("span");
            text.setAttribute("label", id);
            text.setAttribute("id", "lbl_" + id);
            text.appendChild(inNode);

            let checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("id", "chk_"+id);

            checkbox.className = "list_checkbox";
            checkbox.setAttribute("onchange", "check_marcado(chk_"+id+")");
            li.appendChild(checkbox);
            li.appendChild(text);

            document.getElementById("myList").appendChild(li);
            document.getElementById("newitem").value = "";
        }
    }
});

function check_marcado(elemento){
    var renglon = elemento.id.substring(4);
    document.getElementById("lbl_"+renglon).className = "done";
}