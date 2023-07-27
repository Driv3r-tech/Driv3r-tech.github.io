//Values
var nothing = "Не выбрано";

var L0 = document.getElementById("L0");
var L0s = {
	0: nothing,
	1: "Бразилия",
	2: "Россия",
	3: "Индия",
	4: "Китай",
	5: "ЮАР"
};

var L1 = document.getElementById("L1");
var L1s = {
	"Бразилия": [nothing, "Сан-Паулу", "Рио-де-Жанейро"],
	"Россия": [nothing, "Москва", "Санкт-Петербург"],
	"Индия": [nothing, "Мумбаи", "Дели"],
	"Китай": [nothing, "Шанхай", "Пекин"],
	"ЮАР": [nothing, "Йоханнесбург", "Кейптаун"]
};

var L2 = document.getElementById("L2");
var L2s = {
	"Сан-Паулу": [nothing, "111", "222"],
	"Рио-де-Жанейро": [nothing, "333", "444"],
	"Москва": [nothing, "555", "666"],
	"Санкт-Петербург": [nothing, "777", "888"],
	"Мумбаи": [nothing, "999", "000"],
	"Дели": [nothing, "1111", "2222"],
	"Шанхай": [nothing, "3333", "4444"],
	"Пекин": [nothing, "5555", "6666"],
	"Йоханнесбург": [nothing, "7777", "8888"],
	"Кейптаун": [nothing, "9999", "0000"]
};


//DB
var blocks = {
	0: [L0, L0s],
	1: [L1, L1s],
	2: [L2, L2s]
};

//Listeners
L0.addEventListener("change", function() {
	visualBlock(0);
});

L1.addEventListener("change", function() {
	visualBlock(1);
});




//Initializer
window.onload = initValues;
function initValues() {
	populateOptions(L0, Object.values(L0s));  
	visualBlock(0);
}

//Functions
function visualBlock(index){
	for(let i = index; i < Object.keys(blocks).length - 1; ++i){
		blocks[i + 1][0].style.display = blocks[index][0].value == nothing ? "none" : "block";
	}
	
	for(let i = index; i < Object.keys(blocks).length - 1; ++i){
		selectFunction(blocks[i][0], blocks[i + 1][0], blocks[i + 1][1]);
	}
}


function selectFunction(head, child, childArray) {  
	child.innerHTML = "";
	child.style.display = (head.value == nothing) ? "none" : "block";

	populateOptions(child, Object.values(childArray[head.value]));
}


function populateOptions(element, optionsArray) {
	element.innerHTML = "";
  
	for (let i = 0; i < optionsArray.length; ++i)
		element.add(new Option(optionsArray[i], optionsArray[i], false, false));
}





//Button
var saveButton = document.getElementById("saveButton");
var answer = document.getElementById("answer");
saveButton.addEventListener("click", function() {
	var an = (L0.value==nothing?"":L0.value) 
			+ " " + (L1.value==nothing?"":L1.value)
			+ " " + (L2.value==nothing?"":L2.value);
	console.log(an);	
	BX24.init(function(){
		deal = BX24.placement.info();
		console.log(deal.options.ID);
		
		BX24.callMethod("crm.deal.update", 
				{ 
				id: deal.options.ID, 
				fields:
					{ 
						"UF_CRM_1690285429830": an
					}
				}, function(result) {
					if(result.error())
						console.error(result.error());
					else {
						console.dir(result.data());
					}
				}
			);
		
		BX24.callMethod("crm.deal.get", { id: deal.options.ID }, function(result) {
				if(result.error())
					console.error(result.error());
				else {
					console.dir(result.data());
					answer.innerHTML = result.data().UF_CRM_1690285429830;
				}
			}
		);

		console.log('B24 SDK is ready!', BX24.isAdmin());			
	});
});
