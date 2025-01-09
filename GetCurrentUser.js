function executeWidgetCode() {
    require(["DS/WAFData/WAFData", "DS/i3DXCompassServices/i3DXCompassServices"], function (WAFData, i3DXCompassServices) {
        var myWidget = {

            onLoadWidget : function(){

            var urlWAF = 'https://3dexperience2024x.solize.com/3dspace/resources/AppsMngt/api/custom/applications' ;
                console.log(urlWAF);


                var methodWAF = "GET";
                var responses = WAFData.authenticatedRequest(urlWAF, {
                     method: methodWAF,
                    type: "json",
                    params: {
                        current : "true",
                        select : "collabspaces"
                      },
    
            });
            const xhr = responses.xhr;
            
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) { 
                  if (xhr.status === 200) { 
                    console.log(xhr.responseText);
                    
                    const data = JSON.parse(xhr.responseText);
                    
                    const names = data.data.map(item => item.attributes.name);
              
                    console.log(names);
              
                    // Display the response data along with the extracted names in the widget
                    widget.body.innerHTML = `
                      <h3>List of Widgets:</h3>
                      <ol id = "unorderdList" class="name-list">
                        ${names.map(name => `<li>${name}</li>`).join('')}
                      </ol>
                    `;
                  } else {
                    console.error('Request failed with status:', xhr.status);
                  }
                }
              };
              
            }
        };

        widget.addEvent("onLoad", myWidget.onLoadWidget);
        widget.addEvent("onRefresh", myWidget.onLoadWidget);

    });
}
