var OS;
var CPUPower;
var RAM;
var SSDStorage;
var Subscription;
var mobileApp;
var language;
var Region;
var multiIp;
var serviceDecision;
var storageSize;


$("#submitChoices").click(function(){
	CPUPower = $("#cpuPower").val();
	RAM = $("#ram").val();
	storageSize = $("#storageSize").val();
	OS = $("input[name=os]:checked").val();
	SSDStorage = $("input[name=disk]:checked").val();
	Subscription = $("input[name=sub]:checked").val();
	Region =  $("input[name=region]:checked").val();
	mobileApp = $("input[name=mobileApp]:checked").val();
	multiIp= $("input[name=multiIp]:checked").val();
	language = $("input[name=en]:checked").val();
	
	decisionTreeModel();


	var instanceSize = "small";
	var OSString = "Ubuntu";
	var diskTypeString = "SSD";
	var diskSizeString = "Small";
	var regionString = "us-east";
	var serviceDecisionString;

	if(serviceDecision=="google")
		serviceDecisionString="Google Cloud";
	else if (serviceDecision=="aws")
		serviceDecisionString="AWS";
	else if(serviceDecision=="aliyun")
		serviceDecisionString="Aliyun";


	//$("#service_selector").selectpicker('refresh');
	//$('#size_selector').selectpicker('refresh');

	if(CPUPower>=4)
		instanceSize = "medium";

	if(RAM>=8)
		instanceSize = "medium";

	if(CPUPower>8)
		instanceSize = "large";

	if(RAM>=16)
		instanceSize = "large";


	if(OS=="linux")
		OSString = "Ubuntu";
	else if(OS=="windows")
		OSString = "Windows";

	if (SSDStorage=="ssd")
		diskTypeString = "SSD";
	else if(SSDStorage=="std")
		diskTypeString = "Standard";

	if (storageSize<=10)
		diskSizeString = "Small";
	else if (storageSize<=30)
		diskSizeString = "Medium";
	else 
		diskSizeString = "Large";

	if (serviceDecision=="aliyun"){
		if(Region == "asia")
			regionString = "China Shenzhen";
		else
			regionString = "US Virginia";
	}
	else if (serviceDecision=="google"){
		if(Region == "asia")
			regionString = "Taiwan";
		else if (Region == "us")
			regionString = "US Iowa";
		else if (Region == "eu")
			regionString = "Belgium";
	}
	else if (serviceDecision == "aws"){
		if (Region == "asia")
			regionString = "Asia Pacific Tokyo";
		else if (Region == "us") 
			regionString = "US East";
		else if (Region == "eu")
			regionString = "EU Ireland";
	}

	$("#service_selector").val(serviceDecision);





	$("#recdSP").text(serviceDecisionString);
	$("#recdIS").text(instanceSize);
	$("#recdOS").text(OS);
	$("#recdDT").text(diskTypeString);
	$("#recdDS").text(diskSizeString);
	$("#recdReg").text(regionString);

	alert('Recommend successfully');



});














function decisionTreeModel(){
	if(OS== "linux")
{

	if(Region == "asia")
	{
		
		if(CPUPower >3.5)
		{

			if(Subscription>1.5)
			{
				serviceDecision = "google";
				
			}
			else
			{
				serviceDecision = "aws";
			}
		}
		else
		{
			if(language == "yes")
			{
				serviceDecision = "google";
			}
			else
			{
				serviceDecision = "aliyun";
			}
		}
	}
	else if(Region == "eu")
	{
		serviceDecision = "google";
	}
	else
	{
		if(Subscription >1.5)
		{
			serviceDecision = "google";
		}
		else
		{
			serviceDecision = "aws";
		}
	}
}
else
{
	if(CPUPower >1.5)
	{
		if(language == "yes")
		{
			serviceDecision = "aws";
		}
		else
		{
			if(Region== "asia")
			{
				if(RAM>17)
				{
					serviceDecision = "aws";
				}
				else
				{
					serviceDecision = "aliyun";
				}
			}
			else if(Region == "eu")
			{
				serviceDecision = "aws";
			}
			else
			{
				serviceDecision = "aws";
			}
		}
	}
	else
	{
		serviceDecision= "google";
	}
}







}