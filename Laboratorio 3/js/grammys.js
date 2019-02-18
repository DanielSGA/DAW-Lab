$.ajax({
    url: "data/grammys.json",
    type: "GET",
    dataType: "json",

    success: function(data)
    {
        let new_html = "";

        for(let iX = 0; iX < data.fields.length; iX++)
        {
            console.log(data.length);
            new_html += `<option value = "${data.fields[iX].field_id -1}">${data.fields[iX].field}</option>`;
        }

        $("#category_types").append(new_html);
        loadInfo();
    },

    error: function(error_msg)
    {
        console.log(error_msg);
    }
});

function loadInfo()
{
    $.ajax({
        url: "data/grammys.json",
        type: "GET",
        dataType: "json",

        success: function(data)
        {
            $("#category_types").on("change", function(event)
            {
                let id = $(this).val();

                if(id !== "-1")
                {
                    let new_html = "";
                    let sel = data.fields[id];
                    new_html += `<h2>${sel.field}</h2>`;

                    if(sel.description)
                    {
                        new_html += `<p>${sel.description}</p>`; 
                    }

                    for(let iY = 0; iY < sel.categories.length; iY++)
                    {
                        new_html += `<h3>${sel.categories[iY].category_name}</h3><ul>`;
                        
                        for(let iW = 0; iW < sel.categories[iY].nominees.length; iW++)
                        {
                            if(sel.categories[iY].winner_id = iW)
                            {
                                new_html += `<li><strong class="winner>${sel.categories[iY].nominees[iW].nominee}</strong>`;
                            }
                            else
                            {
                                new_html += `<li><strong>${sel.categories[iY].nominees[iW].nominee}</strong>`;
                            }

                            new_html += `<p>${sel.categories[iY].nominees[iW].artist}</p>
                                        <p>${sel.categories[iY].nominees[iW].info}</p></li>`;
                        }

                        new_html += `</ul>`
                    }

                    $("#nominees_section").html(new_html);
                }
                else
                {
                    $("#nominees_section").html();
                }
            });
        },

        error: function(error_msg)
        {
            console.log(error_msg);
        }
        
    });
    
}