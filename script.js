window.onload = function(){
  //===================================
    //data
    var rawCsvData = "";
    var ajax = new XMLHttpRequest();
		var recordsArray = [];
		var lastnameFirstArray = [];
		var friendEmails = [];
    
  //===================================
    //event handlers
		ajax.onload = function()
		{
			if(ajax.status === 200 || ajax.status === 0)
			{
				rawCsvData = ajax.responseText;
				recordsArray = rawCsvData.split('\n');
				createArrays(recordsArray);
				populateDropdownList(lastnameFirstArray);
			}
			else
			{
				alert("You've got ajax problems");
			}
		}
		
    id('selEmail').onchange = function()
		{
      var i = id('selEmail').selectedIndex;
      var chosenPerson = id('selEmail').options[i].text;
			var pieces = chosenPerson.split(',');
			chosenPerson = pieces[1] +  " " + pieces[0];			
      var yes = confirm('Email '+ chosenPerson +'?');   
      if(yes)
			{
					var emailAddress = friendEmails[i].substring(friendEmails[i].indexOf("<"));
					email(chosenPerson + " " + emailAddress);
      }
			id('selEmail').selectedIndex = 0;
    };

  //===================================  
    //functions
    function id(identifier)
		{
      return document.getElementById(identifier);
    }
    
    function email(name)
		{
			window.location.assign("mailto: " + name);
    }
		function populateDropdownList(lines)
		{
			id('selEmail').innerHTML = "";
			var heading= document.createTextNode("Choose Friend to Email");
			var opt0 = document.createElement('option');
			//append textnode to opt0
			opt0.appendChild(heading);
			//append opt0 to dropdown list
			id('selEmail').appendChild(opt0);
			//loop through the list of friends and add them to the dropdown
			for(var i = 1;i < lines.length; i++)
			{
				//create text node of next friend on the list
				var friend = document.createTextNode(lines[i]);
				//create an option element for that friend
				var opt = document.createElement('option');
				//append to dropdown
				opt.appendChild(friend);
				id('selEmail').appendChild(opt);
			}
		}
		function createArrays(array)
		{
			for(var i=1; i<array.length; i++)
			{
				var pieces = array[i].split(',');
				lastnameFirstArray.push(pieces[0] + ", " + pieces[1]); //lastname, firstname
				friendEmails.push(pieces[0] + ", " + pieces[1] + " " + pieces[2]);
			}
			lastnameFirstArray.sort();
			friendEmails.sort();
		}
		
		ajax.open('GET','friendMail.csv',true);
		ajax.send(null);
}