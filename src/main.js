import 'bootstrap/dist/css/bootstrap.min.css'
import Chart from 'chart.js/auto'

var initialSubmit = document.getElementById("initialSubmit");
initialSubmit.addEventListener("click", hideInitialForm);

var budgetSubmit = document.getElementById("budgetSubmit");
budgetSubmit.addEventListener("click", addBudgetItem);

var totalBudget = 0;
var remainingBudget = 0;

var budgetNames = [];
var budgetAmounts = [];

var budgetChart = new Chart
(
	document.getElementById("myPieChart"),
	{
		type: "pie",
		data:
		{
			labels: ['Remaining Budget'],
			datasets:
			[
				{
					label: 'Budget Dataset',
					data: [0],
					backgroundColor:
					[
						'rgb(255, 99, 132)',
						'rgb(54, 162, 235)',
						'rgb(255, 205, 86)',
						'rgb(255, 99, 12)',
						'rgb(54, 162, 25)',
						'rgb(154, 12, 25)',
						'rgb(25, 205, 86)',
						'rgb(5, 9, 212)',
						'rgb(4, 62, 125)',
						'rgb(14, 93, 34)',
						'rgb(12, 25, 186)'
					],
					hoverOffset: 4
				}
			]
		},
	}
)

function hideInitialForm(event)
{
	event.preventDefault();

	var initialForm = document.getElementById("initialForm");
	var budgetForm = document.getElementById("budgetForm");

	initialForm.classList.remove("visible");
	initialForm.classList.add("hidden");

	budgetForm.classList.remove("hidden");
	budgetForm.classList.add("visible");

	totalBudget = parseInt(document.getElementById("allowance").value);
	remainingBudget = totalBudget;

	budgetNames.push("Remaining Budget");
	budgetAmounts.push(totalBudget);

	budgetChart.data.labels = budgetNames;
	budgetChart.data.datasets[0].data = budgetAmounts;
	budgetChart.update();

	document.getElementById("totalBudget").innerHTML = "Total Budget:  $" + totalBudget;
}

function addBudgetItem(event)
{
	event.preventDefault();

	var newName = document.getElementById("categoryName").value;
	var newAmount = parseInt(document.getElementById("categoryAmount").value);

	if(remainingBudget - newAmount >= 0)
	{
		remainingBudget = remainingBudget - newAmount;
		budgetAmounts[0] = remainingBudget;
		budgetNames.push(newName);
		budgetAmounts.push(newAmount);

		budgetChart.data.labels = budgetNames;
		budgetChart.data.datasets[0].data = budgetAmounts;
		budgetChart.update();

		document.getElementById("remainingBudget").innerHTML = "Remaining Budget:  $" + remainingBudget;
	}
	else
	{
		alert("Not enough money left to add that!");
	}
}
