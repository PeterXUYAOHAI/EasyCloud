





var OS;
var CPUPower;
var RAM;
var SSDStorage;
var Subscription;
var mobileApp;
var language;
var region;
var multiIp;
var serviceDecision;
var storageSize;

$("#submitChoices").click(function(){
	CPUPower = $("#cpuPower").val();
	RAM = $("#ram").val();
	SSDStorage = $("input[name=disk]:checked").val();
	Subscription = $("input[name=sub]:checked").val();
	Region =  $("input[name=region]:checked").val();
	mobileApp = $("input[name=mobileApp]:checked").val();
	multiIp= $("input[name=multiIp]:checked").val();
	language = $("input[name=en]:checked").val();

});














function decisionTreeModel(){
	if(OS ==Linux)
	{
		serviceDecision = "google"; 
	}
	else if(OS == Windows)
	{
		if(CPUPower > 1.5)
		{
			if(RAM > 3)
			{
				serviceDecision = "aws";
			}
			else
			{
				if(RAM >1.75)
				{
					if(SSDStorage == Yes)
					{
						if(Subscription >1.5)
						{
							serviceDecision = "aws";
						}
						else
						{
							if(mobileApp = Yes)
							{
								serviceDecision = "aws";
							}
							else
							{ 
								serviceDecision = "aliyun";
							}
						}
					}
					else
					{
						serviceDecision = "aws";
					}

				}
				else
				{
					serviceDecision = "aws";
				}
			}
		}
		else
		{
			if(RAM >24)
			{
				serviceDecision = "aws";
			}
			else
			{
				serviceDecision = "google";
			}
		}
	}

	else
	{
		if(language == English)
		{
			if(region == Asia)
			{
				serviceDecision = "aliyun";
			}
			else if(region == America)
			{
				serviceDecision = "aws";
			}
			else
			{
				serviceDecision = "google";
			}
		}
		else
		{
			serviceDecision = "aliyun";
		}
	}





}