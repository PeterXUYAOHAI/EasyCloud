//$('#size_selector').val('medium');



$('#service_selector').change(function(){   
	var opt = $(this).val();
	if (opt == "aws") {
		$("#size_selector").html('<option value="small" selected="selected" >aSmall</option><option value="medium">aMedium</option><option value="large">aLarge</option>');
		//$('#size_selector').selectpicker('refresh');
		$("#myModalLabel").text("Pleae Input AWS Key");
		$("#keyForm").html('<div class="form-group">'+
'                                        <label id="publicKeyLabel">AWS Public Key</label>'+
'                                       <input id="awsPublicKey" type="email" class="form-control"'+
'                                        placeholder="Public Key"/>'+
'                                    </div>'+
'                                    <div class="form-group">'+
'                                        <label for="publicKeyLabel">AWS Secret Key</label>'+
'                                        <input id="awsSecretKey" type="password" class="form-control"'+
'                                        placeholder="Secret Key"/>'+
 '                                   </div>');

	} else if (opt == "google") {
		$("#size_selector").html('<option value="f1-micro" selected="selected">Small</option><option value="n1-standard-4">Medium</option><option value="n1-highmem-8">Large</option>');
		$("#region_selector").html('<option value="asia-east1-b">Taiwan</option>'+
                                   '<option value="europe-west1-b">Belgium</option>'+
                                    '<option value="us-central1-b">US Iowa</option>'+
                                    '<option value="us-east1-b">US South Carolina</option>');
                   
		//$("#region_selector").selectpicker('refresh');
		//$('#size_selector').selectpicker('refresh');
		$("#myModalLabel").text("Pleae Input Google Cloud Key");
		$("#keyForm").html('<div class="form-group">'+
'                                        <label id="publicKeyLabel">Project ID</label>'+
'                                        <input id="googleProjectId" type="email" class="form-control"'+
'                                        placeholder="Public Key"/>'+
'                                   </div>'+
'                                    <div class="form-group">'+
'                                       <label id="publicKeyLabel">Client ID</label>'+
'                                       <input id="googleClientId" type="email" class="form-control"'+
'                                       placeholder="Public Key"/>'+
'                                   </div>'+
'                                    <div class="form-group">'+
'                                        <label for="publicKeyLabel">API Key</label>'+
'                                        <input id="googleApiKey" type="password" class="form-control"'+
'                                        placeholder="Secret Key"/>'+
'                                    </div>');

	} else if (opt == "aliyun") {
		$("#size_selector").html('<option value="ecs.t1.small" selected="selected">Small (ecs.t1.small) </option><option value="ecs.s1.medium">Medium (ecs.s1.medium) </option><option value="ecs.s1.large">Large (ecs.s1.large) </option><option value="ecs.s2.xlarge">Extra Large (ecs.s2.xlarge) </option>');
		$("#region_selector").html('<option value="ap-southeast-1">Singapore</option>'+
                                   '<option value="cn-shenzhen">China Shenzhen</option>'+
                                   ' <option value="cn-qingdao">China Qingdao</option>'+
                                    '<option value="cn-beijing">China Beijing</option>'+
                                    '<option value="cn-hangzhou">China Hangzhou</option>'+
                                    '<option value="cn-shanghai">China Shanghai</option>'+
                                    '<option value="cn-hongkong">Hong Kong</option>'+
                                    '<option value="us-west-1">US Slicon Valley</option>'+
                                    '<option value="us-east-1">US Virginia</option>');
		//$("#region_selector").selectpicker('refresh');
		//$('#size_selector').selectpicker('refresh');
		$("#myModalLabel").text("Pleae Input Aliyun Key");
		$("#keyForm").html('<div class="form-group">'+
'                                        <label id="publicKeyLabel">Aliyun Public Key</label>'+
'                                        <input id="aliyunPublicKey" type="email" class="form-control"'+
'                                        placeholder="Public Key"/>'+
'                                    </div>'+
'                                    <div class="form-group">'+
'                                        <label for="publicKeyLabel">Aliyun Secret Key</label>'+
'                                        <input id="aliyunSecretKey" type="password" class="form-control"'+
'                                        placeholder="Secret Key"/>'+
'                                    </div>')
	}

});   


var serviceProvider;
var totalInstanceNum = 0;
var ALY = window.ALY;
var aliyunPublicKey;
var aliyunSecretKey;
var aliyunOS;
var aliyunDiskType;
var aliyunDiskSize;
var aliyunInstanceSize;
var aliyunRegion;

/*******************Var for Gcloud*************************/
var PROJECT_ID;
//var PROJECT_ID = 'crucial-lyceum-111906';
var CLIENT_ID;
//var CLIENT_ID = '445709190023-4rivs01d4bv07v2kuee2qlhjafk9ulfe.apps.googleusercontent.com';
var API_KEY;
//var API_KEY = 'AIzaSyA-7ahirzLgaK5M4X10lt-p1Ub9icGCM7M';
var SCOPES = 'https://www.googleapis.com/auth/compute';
var API_VERSION = 'v1';

var DEFAULT_PROJECT;
// = PROJECT_ID;
var DEFAULT_ZONE;
// = 'us-central1-b'; // For example, us-central1-a
var DEFAULT_NUM = 0;
var DEFAULT_NAME = 'instance-' + DEFAULT_NUM;
var GOOGLE_PROJECT;
// = 'ubuntu-os-cloud'; // project hosting a shared image
var DEFAULT_DISK_NAME;
// = DEFAULT_NAME;
var DEFAULT_IMAGE;
// = 'ubuntu-1404-trusty-v20160406';
var BASE_URL;
// = 'https://www.googleapis.com/compute/' + API_VERSION;
var PROJECT_URL;
// = BASE_URL + '/projects/' + DEFAULT_PROJECT;
var GOOGLE_PROJECT_URL;
// = BASE_URL + '/projects/' + GOOGLE_PROJECT;
var DEFAULT_DISK_URL;
// = PROJECT_URL + '/zones/' + DEFAULT_ZONE + '/disks/' + DEFAULT_DISK_NAME;
 var DEFAULT_DISKTYPES;
 // = '/diskTypes/pd-ssd';
 var DEFAULT_DISKSIZE;
 // = 16; 
var DEFAULT_DISKTYPES_URL;
// = PROJECT_URL + '/zones/' + DEFAULT_ZONE + DEFAULT_DISKTYPES;
var DEFAULT_IMAGE_URL;
// = GOOGLE_PROJECT_URL + '/global/images/' + DEFAULT_IMAGE;

var DEFAULT_IMAGE_NAM;
// = DEFAULT_NAME;
var DEFAULT_MACHINE_TYPE;
// = 'f1-micro';

var DEFAULT_MACHINE_URL;
// = PROJECT_URL + '/zones/' + DEFAULT_ZONE + s'/machineTypes/' + DEFAULT_MACHINE_TYPE;
var DEFAULT_NETWORK;
// = PROJECT_URL + '/global/networks/default';
var DEFAULT_RETURN_JSON;
var DEFAULT_RETURN_EXTERNAL_IP;
var DEFAULT_RETURN_INTERNAL_IP;
var DEFAULT_RETURN_IMAGE;
var DEFAULT_RETURN_REGION;
var DEFAULT_RETURN_INSTANCE_NAME;
var DEFAULT_RETURN_CREATETIME;
var DEFAULT_RETURN_STATUS;
var DEFAULT_RETURN_INSTANCE_SIZE


var accessKeyId;
var secretAccessKey;
var defaultRegion;
// var defaultAvailabilityZone;
var runningInstances;
var AllUserInstances;
var credentials;
var ec2;
var regionNames;
var awsOS;
var awsDiskSize;
var KeyPairName;
var createdInstance;



$("#creatButton").click(function(){

	serviceProvider = $("#service_selector").val();
	totalInstanceNum++;
	if(serviceProvider=="aliyun"){
		aliyunPublicKey=$("#aliyunPublicKey").val();
		aliyunSecretKey=$("#aliyunSecretKey").val();
		prepareParameter();
		aliyunCreateInstance();
	}else if(serviceProvider=="google"){
		PROJECT_ID=$("#googleProjectId").val();
		CLIENT_ID=$("#googleClientId").val();
		API_KEY=$("#googleApiKey").val();

		authorization();
		//insertDisk();
		//setTimeout(function(){ insertInstance(); }, 5000);
		//setTimeout(function(){ addAccessConfig(); }, 15000);
		//setTimeout(function(){ getInstance(); }, 10000);

	}	
});


function authorization() {
  gapi.client.setApiKey(API_KEY);
  gapi.auth.authorize({
    client_id: CLIENT_ID,
    scope: SCOPES,
    immediate: false
  }, function(authResult) {
       if (authResult && !authResult.error) {
        initializeApi();
       } else {
         window.alert('Auth was not successful');
       }
     }
  );
}


function initializeApi() {
  gapi.client.load('compute', API_VERSION,function() {
		prepareParameterForGoogle();
		insertDisk();
		setTimeout(function(){ insertInstance(); }, 15000);
		setTimeout(function(){ addAccessConfig(); }, 50000);
		setTimeout(function(){ getInstance(); }, 80000);	

	});
  window.alert('Auth was successful');
}

function prepareParameterForGoogle(){
	DEFAULT_MACHINE_TYPE = $("#size_selector").val();
	var os = $("#os_selector").val();
	var diskT = $("#diskT_selector").val();
	var diskS = $("#diskS_selector").val();
	var reg = $("#region_selector").val();

	// if(instanceSize=="small")
	// 	aliyunInstanceSize = 'ecs.t1.small';
	// else if (instanceSize=="medium")
	// 	aliyunInstanceSize = 'ecs.s1.medium';
	// else if (instanceSize=="large") 
		 

	if(os=="ubuntu"){
		DEFAULT_IMAGE="ubuntu-1404-trusty-v20160406";
		GOOGLE_PROJECT ="ubuntu-os-cloud";
	}
	// else if(machineT=="small"){
	// 	DEFAULT_MACHINE_TYPE = "f1-micro";
	// }
	// else if(machineT=="medium"){
	// 	DEFAULT_MACHINE_TYPE = "n1-standard-4";
	// }
	// else if(machineT=="large"){
	// 	DEFAULT_MACHINE_TYPE = "n1-highmem-8";
	// }
	else if (os=="centos"){
		GOOGLE_PROJECT="centos-cloud";
		DEFAULT_IMAGE ="centos-7-v20160329";
	}
	else if (os=="debian"){
		GOOGLE_PROJECT="debian-cloud";
		DEFAULT_IMAGE ="debian-8-jessie-v20160329";
	}
	else if (os=="suse"){
		GOOGLE_PROJECT="suse-cloud";
		DEFAULT_IMAGE ="sles-12-sp1-v20160301";
	}
	else if (os=="windows"){
		GOOGLE_PROJECT="windows-cloud";
		DEFAULT_IMAGE ="windows-server-2012-r2-dc-v20160323";
	}


	if(diskT == "normal")
		DEFAULT_DISKTYPES = "pd-standard";
	else if(diskT == "ssd")
		DEFAULT_DISKTYPES = "pd-ssd";

	if(diskS == "small")
		 DEFAULT_DISKSIZE= 10;
	else if(diskS=="medium")
		DEFAULT_DISKSIZE = 30;
	else if(diskS=="large")
		DEFAULT_DISKSIZE = 80;

	// if(reg == "am")
	// 	aliyunRegion = "us-west-1";
	// else if(reg=="as")
	// 	aliyunRegion = "cn-shenzhen";
	// else if(reg == "eu"){
	// 	alert("No Instance in Europe Region");
	DEFAULT_ZONE = reg;

		DEFAULT_PROJECT = PROJECT_ID;
		DEFAULT_DISK_NAME = DEFAULT_NAME;
		BASE_URL = 'https://www.googleapis.com/compute/' + API_VERSION;
		PROJECT_URL = BASE_URL + '/projects/' + DEFAULT_PROJECT;
		GOOGLE_PROJECT_URL = BASE_URL + '/projects/' + GOOGLE_PROJECT;
		DEFAULT_DISK_URL = PROJECT_URL + '/zones/' + DEFAULT_ZONE +'/disks/' + DEFAULT_DISK_NAME;
		
		DEFAULT_IMAGE_URL = GOOGLE_PROJECT_URL + '/global/images/' + DEFAULT_IMAGE;
		DEFAULT_DISKTYPES_URL = PROJECT_URL + '/zones/' + DEFAULT_ZONE + '/diskTypes/' +DEFAULT_DISKTYPES;
		DEFAULT_IMAGE_NAME = DEFAULT_NAME;
		DEFAULT_MACHINE_URL = PROJECT_URL + '/zones/' + DEFAULT_ZONE + '/machineTypes/' + DEFAULT_MACHINE_TYPE;
		DEFAULT_NETWORK = PROJECT_URL + '/global/networks/default';


	return;
	
}


function executeRequest(request, apiRequestName) {
  request.execute(function(resp) {
  	
    //newWindow = window.open(apiRequestName, '', 'width=600, height=600, scrollbars=yes');
    //newWindow.document.write('<h1>' + apiRequestName + '</h1> <br />' + '<pre>' + JSON.stringify(resp.result, null, ' ') + '</pre>');
    //$("#result").html('<h3>' + apiRequestName + '</h3> <br />' +
    //  '<pre>' + JSON.stringify(resp.result, null, ' ') + '</pre>');	
	if(apiRequestName === "getInstance"){
  		DEFAULT_RETURN_JSON = resp;
		DEFAULT_RETURN_INTERNAL_IP = DEFAULT_RETURN_JSON.networkInterfaces[0].networkIP;
		DEFAULT_RETURN_IMAGE = DEFAULT_RETURN_JSON.disks[0].licenses[0];
		DEFAULT_RETURN_REGION = DEFAULT_RETURN_JSON.zone;
		DEFAULT_RETURN_INSTANCE_NAME = DEFAULT_RETURN_JSON.name;
		DEFAULT_RETURN_CREATETIME = DEFAULT_RETURN_JSON.creationTimestamp;
		DEFAULT_RETURN_EXTERNAL_IP = DEFAULT_RETURN_JSON.networkInterfaces[0].accessConfigs[0].natIP;
		DEFAULT_RETURN_STATUS = DEFAULT_RETURN_JSON.status;
		DEFAULT_RETURN_INSTANCE_SIZE = DEFAULT_RETURN_JSON.machineType;

		var start = DEFAULT_RETURN_REGION.indexOf("zones");
		DEFAULT_RETURN_REGION = DEFAULT_RETURN_REGION.slice(start+6,DEFAULT_RETURN_REGION.length);
		start = DEFAULT_RETURN_IMAGE.indexOf("licenses");
		DEFAULT_RETURN_IMAGE = DEFAULT_RETURN_IMAGE.slice(start+9,DEFAULT_RETURN_IMAGE.length);
		start =  DEFAULT_RETURN_INSTANCE_SIZE.indexOf("machineTypes");
		DEFAULT_RETURN_INSTANCE_SIZE = DEFAULT_RETURN_INSTANCE_SIZE.slice(start+13,DEFAULT_RETURN_INSTANCE_SIZE.length);
		
		
		var detailHtmlString=''+
'			<div class="list-group text-left">'+
'							<a class="list-group-item">'+
'                                <i class="fa fa-power-off fa-fw"></i> Status'+
'                                <span class="pull-right text-primary"><em id="'+DEFAULT_RETURN_INSTANCE_NAME+'Status">'+ DEFAULT_RETURN_STATUS +'</em>'+
'                                </span>'+
'                            </a>'+
'                           <a class="list-group-item">'+
'                                <i class="fa fa-cloud fa-fw"></i> Service Provider'+
'                                <span class="pull-right text-muted small"><em>'+ serviceProvider +'</em>'+
'                                </span>'+
					
'                            </a>'+
'                            <a class="list-group-item">'+
'                               <i class="fa fa-sellsy fa-fw"></i> Instance Type'+
'                                <span class="pull-right text-muted small"><em>'+ DEFAULT_RETURN_INSTANCE_SIZE +'</em>'+
'                                </span>'+
'                            </a>'+
'                            <a class="list-group-item">'+
'                                <i class="fa fa-cloud fa-fw"></i> Instance Id'+
'                                <span class="pull-right text-muted small"><em>'+ DEFAULT_RETURN_INSTANCE_NAME +'</em>'+
'                                </span>'+
'                            </a>'+
'                            <a class="list-group-item">'+
'                                <i class="fa fa-angle-double-up fa-fw"></i> Public IP<span class="pull-right text-muted small"><em>'+DEFAULT_RETURN_EXTERNAL_IP+'</em>'+
'                                </span>'+
'                            </a>'+
'                             <a class="list-group-item">'+
'                                <i class="fa fa-angle-up fa-fw"></i> Inner IP<span class="pull-right text-muted small"><em>'+DEFAULT_RETURN_INTERNAL_IP+'</em>'+
'                                </span>'+
'                            </a>'+
'                            <a class="list-group-item">'+
'                                <i class="fa fa-map fa-fw"></i> Region Id<span class="pull-right text-muted small"><em>'+DEFAULT_RETURN_REGION+'</em>'+
'                                </span>'+
'                            </a>'+
'                            <a class="list-group-item">'+
'                                <i class="fa fa-desktop fa-fw"></i> Image Id'+
'                                <span class="pull-right text-muted small"><em></em>'+									
'                           </span>'+
'								<p class="text-muted small">'+ DEFAULT_RETURN_IMAGE +'</p>'+
'                             </a>'+
'                           <a class="list-group-item">'+
'                                <i class="fa fa-clock-o fa-fw"></i> Creation Time'+
'                                <span class="pull-right text-muted small"><em></em>'+
'                                </span>' + 
'								<p class="text-muted small">'+DEFAULT_RETURN_CREATETIME+'</p>'+
'                            </a>'+
'                        </div>';
		
		createBlock(detailHtmlString, DEFAULT_RETURN_JSON);
		buttonListenerFresh();
		









		 newWindow = window.open(apiRequestName, '', 'width=600, height=600, scrollbars=yes');
   		 newWindow.document.write('<h1>' + apiRequestName + '</h1> <br />' + '<pre>' + JSON.stringify(resp.result, null, ' ') + '</pre>');
	}else{
		    newWindow = window.open(apiRequestName, '', 'width=600, height=600, scrollbars=yes');
    		newWindow.document.write('<h1>' + apiRequestName + '</h1> <br />' + '<pre>' + JSON.stringify(resp.result, null, ' ') + '</pre>');
	}
    
    if (resp.error) {
      newWindow.document.write('<h1>Error:</h1>');
      newWindow.document.write('<pre>' +
      JSON.stringify(resp.error, null, ' ') + '</pre>');
      //$("#result").html('<h2>Error:</h2>' + '<h3>' + apiRequestName + '</h3> <br />'+ '<pre>' + JSON.stringify(resp.error, null, ' ') + '</pre>');
    }

    
  });
}

function insertDisk() {
  var request = gapi.client.compute.disks.insert({
    'project': DEFAULT_PROJECT,
    'zone': DEFAULT_ZONE,
    'sourceImage': DEFAULT_IMAGE_URL,
    //'type': DEFAULT_DISKTYPES_URL,
    'resource': {
      'name': DEFAULT_DISK_NAME,
      'type': DEFAULT_DISKTYPES_URL,
      'sizeGb':DEFAULT_DISKSIZE
    }
  });
  executeRequest(request, 'insertDisk');
}

function insertInstance() {
  resource = {
    'image': DEFAULT_IMAGE_URL,
    'name': DEFAULT_IMAGE_NAME,
    'machineType': DEFAULT_MACHINE_URL,
    'disks': [{
     'source': DEFAULT_DISK_URL,
     'type': 'PERSISTENT',
     'boot': true
    }],
    'networkInterfaces': [{
      'network': DEFAULT_NETWORK,
    }]
  };
  gapi.client;
  gapi.client.compute;
  gapi.client.compute.instances;
  var request = gapi.client.compute.instances.insert({
    'project': DEFAULT_PROJECT,
    'zone': DEFAULT_ZONE,
    'resource': resource
  });
  executeRequest(request, 'insertInstance');
}

function addAccessConfig() {
  var request = gapi.client.compute.instances.addAccessConfig({
    'project': DEFAULT_PROJECT,
    'instance': DEFAULT_NAME,
    'zone': DEFAULT_ZONE,  
    'networkInterface': 'nic0', 
    'resource': {
      'kind': "compute#accessConfig",
      'type': 'ONE_TO_ONE_NAT',
      'name': 'External NAT',
      //'natIP':''
    }
  });
  executeRequest(request, 'addAccessConfig');
}

function getInstance() {
  var request = gapi.client.compute.instances.get({
    'project': DEFAULT_PROJECT,
    'zone': DEFAULT_ZONE,
    'instance': DEFAULT_IMAGE_NAME
  });
  executeRequest(request, 'getInstance');
}

function deleteInstance(i,z,p) {
  var request = gapi.client.compute.instances.delete({
    'project': p,
    'zone': z,
    'instance': i
  });
  executeRequest(request, 'deleteInstance');
}

function stopInstance(i,z,p){
	var request = gapi.client.compute.instances.stop({
    'project': p,
    'zone': z,
    'instance': i
  });
  executeRequest(request, 'stopInstance');
}

function startInstance(i,z,p){
	var request = gapi.client.compute.instances.start({
    'project': p,
    'zone': z,
    'instance': i
  });
  executeRequest(request, 'startInstance');
}


function prepareParameter(){
	var instanceSize = $("#size_selector").val();
	var os = $("#os_selector").val();
	var diskT = $("#diskT_selector").val();
	var diskS = $("#diskS_selector").val();
	var reg = $("#region_selector").val();

	// if(instanceSize=="small")
	// 	aliyunInstanceSize = 'ecs.t1.small';
	// else if (instanceSize=="medium")
	// 	aliyunInstanceSize = 'ecs.s1.medium';
	// else if (instanceSize=="large") 
		aliyunInstanceSize = instanceSize;

	if(os=="ubuntu")
		aliyunOS="ubuntu1404_64_20G_aliaegis_20150130.vhd";
	else if (os=="centos")
		aliyunOS="centos6u5_64_20G_aliaegis_20150130.vhd";
	else if (os=="debian")
		aliyunOS="debian750_64_20G_aliaegis_20150130.vhd";
	else if (os=="suse")
		aliyunOS="opensuse1301_64_20G_aliaegis_20150130.vhd";
	else if (os=="windows")
		aliyunOS="win2012_stand_cn_40G_20141114.vhd";


	if(diskT == "normal")
		aliyunDiskType = "cloud";
	else if(diskT == "ssd")
		aliyunDiskType = "cloud_ssd";

	if(diskS == "small")
		aliyunDiskSize = 10;
	else if(diskS=="medium")
		aliyunDiskSize = 30;
	else if(diskS=="large")
		aliyunDiskSize = 80;

	// if(reg == "am")
	// 	aliyunRegion = "us-west-1";
	// else if(reg=="as")
	// 	aliyunRegion = "cn-shenzhen";
	// else if(reg == "eu"){
	// 	alert("No Instance in Europe Region");
	aliyunRegion = reg;
		return;
	
}

var aliyunEcs;
function aliyunCreateInstance(){

	aliyunConnectEcs();

	var instanceID = aliyunCreateNewInstance();
//	aliyunAllocatePublicIpAddress(instanceID);

}

function aliyunConnectEcs(){
	alert(aliyunPublicKey);
	alert(aliyunSecretKey);
	aliyunEcs = new ALY.ECS({
		accessKeyId: aliyunPublicKey,
		secretAccessKey: aliyunSecretKey,
		endpoint: 'https://ecs-cn-hangzhou.aliyuncs.com',
		apiVersion: '2014-05-26'
		}

	);
}


function aliyunCreateNewInstance(){
	var instanceId;
	alert(aliyunRegion);
	aliyunEcs.createInstance({
		RegionId: aliyunRegion,
		ImageId: aliyunOS,
		InstanceType:aliyunInstanceSize,
		SecurityGroupId:'sg-94erb3a85',
		InternetChargeType:'PayByTraffic',
		InternetMaxBandwidthOut:1,
//		DataDisk.1.Category: aliyunDiskType,
//		DataDisk.1.Size: aliyunDiskSize
	}, function(err, res) {
		console.log(err, res);
		instanceId = res.InstanceId;
		alert(instanceId);
		aliyunAllocatePublicIpAddress(instanceId);

	});
	return instanceId;
}


function aliyunAllocatePublicIpAddress(instanceId){
	alert("pub INSTANCEID" + instanceId);
	var IpAddress;
	aliyunEcs.allocatePublicIpAddress({
		InstanceId:instanceId},
		function(err,res){
			console.log(err, res);
			alert("aliyunIpAlloted" + res.IpAddress);
			IpAddress = res.IpAddress;
			aliyunGetInstanceAttributes(instanceId)
		});
}

// function aliyunGetPublicIP(){
// 	aliyunEcs.describeInstanceAttribute({
// 		InstanceId:InstanceId},
// 		function(err, res) {
// 			console.log(err, res);
// 			alert(res.PublicIpAddress.IpAddress)
// 		});

// }

function aliyunGetInstanceAttributes(instanceId){
	aliyunEcs.describeInstanceAttribute({
		InstanceId:instanceId},
		function(err, res) {
			console.log(err, res);
			alert(res.PublicIpAddress.IpAddress);
			var detailString = aliyunGenerateDetailContent(res);
			createBlock(detailString, res);
			buttonListenerFresh();
		});

}

function buttonListenerFresh(){
$(".aliyunStart").click(function(){
	alert("start button is clicked");
	var instanceId = $(this).val();
	alert("gotten instance Id"+ instanceId);
	aliyunEcs.startInstance({
		InstanceId:instanceId},
		function(err, res) {
			console.log(err, res);
			if(res){
				alert("Instance "+instanceId+"is started");

				$("#"+instanceId+"Status").text("Running");
			}
		});
});

$(".gcloudStart").click(function(){
	alert("start button is clicked");
	var info = $(this).val().split("*");
	var i = info[0];
	var z = info[1];
	var p = info[2];
	alert("gotten instance Id"+ i);
	startInstance(i,z,p);
});


$(".aliyunStop").click(function(){
	alert("stop button is clicked");
	var instanceId = $(this).val();
	alert("gotten instance Id");
	aliyunEcs.stopInstance({
		InstanceId:instanceId},
		function(err, res) {
			console.log(err, res);
			if(res){
				alert("Instance "+instanceId+"is stopped");
			$("#"+instanceId+"Status").text("Stopped");
		}
		});
});

$(".gcloudStop").click(function(){
	alert("start button is clicked");
	var info = $(this).val().split("*");
	var i = info[0];
	var z = info[1];
	var p = info[2];
	alert("gotten instance Id"+ i);
	stopInstance(i,z,p);
});

$(".aliyunTerminate").click(function(){
	var instanceId = $(this).val();
	aliyunEcs.deleteInstance({
		InstanceId:instanceId},
		function(err, res) {
			console.log(err, res);
			if(res){
				alert("Instance "+instanceId+"is terminated");
			$("#"+instanceId).remove();
		}
		});
});

$(".gcloudTerminate").click(function(){
	alert("start button is clicked");
	var info = $(this).val().split("*");
	var i = info[0];
	var z = info[1];
	var p = info[2];
	alert("gotten instance Id"+ i);
	deleteInstance(i,z,p);
});


}


function aliyunGenerateDetailContent(attributes){

	var creationTime = attributes.CreationTime;
	var imageId = attributes.ImageId;
	var innerIpAddress = attributes.InnerIpAddress.IpAddress;
	var instanceId = attributes.InstanceId;
	var instanceName = attributes.InstanceName;
	var instanceType = attributes.InstanceType;
	var internetChargeType = attributes.InternetChargeType;
	var publicIpAddress = attributes.PublicIpAddress.IpAddress;
	var regionId = attributes.RegionId;
	var status = attributes.Status;

	var detailHtmlString=''+
'			<div class="list-group text-left">'+
'							<a class="list-group-item">'+
'                                <i class="fa fa-power-off fa-fw"></i> Status'+
'                                <span class="pull-right text-primary"><em id="'+instanceId+'Status">'+ status +'</em>'+
'                                </span>'+
'                            </a>'+
'                           <a class="list-group-item">'+
'                                <i class="fa fa-cloud fa-fw"></i> Service Provider'+
'                                <span class="pull-right text-muted small"><em>'+ serviceProvider +'</em>'+
'                                </span>'+
'                            </a>'+
'                            <a class="list-group-item">'+
'                               <i class="fa fa-sellsy fa-fw"></i> Instance Type'+
'                                <span class="pull-right text-muted small"><em>'+ instanceType +'</em>'+
'                                </span>'+
'                            </a>'+
'                            <a class="list-group-item">'+
'                                <i class="fa fa-cloud fa-fw"></i> Instance Id'+
'                                <span class="pull-right text-muted small"><em>'+ instanceId +'</em>'+
'                                </span>'+
'                            </a>'+
'                            <a class="list-group-item">'+
'                                <i class="fa fa-angle-double-up fa-fw"></i> Public IP<span class="pull-right text-muted small"><em>'+publicIpAddress+'</em>'+
'                                </span>'+
'                            </a>'+
'                             <a class="list-group-item">'+
'                                <i class="fa fa-angle-up fa-fw"></i> Inner IP<span class="pull-right text-muted small"><em>'+innerIpAddress+'</em>'+
'                                </span>'+
'                            </a>'+
'                            <a class="list-group-item">'+
'                                <i class="fa fa-map fa-fw"></i> Region Id<span class="pull-right text-muted small"><em>'+regionId+'</em>'+
'                                </span>'+
'                            </a>'+
'                            <a class="list-group-item">'+
'                                <i class="fa fa-desktop fa-fw"></i> Image Id'+
'                                <span class="pull-right text-muted small"><em></em>'+									
'                           </span>'+
'								<p class="text-muted small">'+ imageId +'</p>'+
'                             </a>'+
'                           <a class="list-group-item">'+
'                                <i class="fa fa-clock-o fa-fw"></i> Creation Time'+
'                                <span class="pull-right text-muted small"><em>'+creationTime+'</em>'+
'                                </span>'+
'                            </a>'+
'                        </div>';


				return detailHtmlString;

}

// $("#test").click(function(){

// 	createBlock();
// });

function createBlock(detailString, attributes){
	if(serviceProvider=="aliyun"){
		var instanceId = attributes.InstanceId;
		var publicIP = attributes.PublicIpAddress.IpAddress;
		var innerIp = attributes.InnerIpAddress.IpAddress;
		var detailString = detailString;
	$("#instanceList").append(
			'<div id="'+instanceId+'">\
				<div class="col-lg-4 col-md-6">\
               <div class="panel panel-red">\
                    <div class="panel-heading">\
                        <div class="row">\
                            <div class="col-xs-3">\
                                <i class="fa fa-cloud fa-5x"></i>\
                            </div>\
                            <div class="col-xs-9 text-right">\
                                <div class="huge">Aliyun ECS</div>\
                                <div>Public IP:'+ publicIP + ' </div>\
                                <div>Inner IP:'+ innerIp + ' </div>\
                            </div>\
                        </div>\
                    </div>\
                    <div class="panel-footer">\
                       <div class="panel panel-default" id="panel3">\
                            <div id="collapse'+totalInstanceNum+'" class="panel-collapse collapse">\
                                <div class="panel-body">'+detailString +'</div>\
                            </div>\
                        </div>\
                        <a data-toggle="collapse" data-target="#collapse'+totalInstanceNum+'"\
                             class="collapsed">\
                    <span class="pull-left">View Details</span>\
                    <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>\
                    <div class="clearfix"></div>\
                </a>\
                	<button class="btn btn-primary btn-md aliyunStart" value="'+instanceId+'"> Start </button>\
                    <button class="btn btn-warning btn-md aliyunStop" value="'+instanceId+'"> Stop </button>\
                    <button class="btn btn-danger btn-md aliyunTerminate" value="'+instanceId+'"> Terminate </button>\
                    </div>\
                </div>\
            </div>\
            </div>'
		);
	}
	else if(serviceProvider=="google"){
		var instanceId = DEFAULT_RETURN_INSTANCE_NAME;
		var publicIP = DEFAULT_RETURN_EXTERNAL_IP;
		var innerIp = DEFAULT_RETURN_INTERNAL_IP;
		var detailString = detailString;
		$("#instanceList").append(

			'<div class="col-lg-4 col-md-6">\
               <div class="panel panel-primary">\
                    <div class="panel-heading">\
                        <div class="row">\
                            <div class="col-xs-3">\
                                <i class="fa fa-google fa-5x"></i>\
                            </div>\
                            <div class="col-xs-9 text-right">\
                                <div class="huge">Google Cloud</div>\
                                <div>Public IP:'+ publicIP + ' </div>\
                            </div>\
                        </div>\
                    </div>\
                    <div class="panel-footer">\
                       <div class="panel panel-default" id="panel3">\
                            <div id="collapse'+totalInstanceNum+'" class="panel-collapse collapse">\
                                <div class="panel-body">'+detailString +'</div>\
                            </div>\
                        </div>\
                        <a data-toggle="collapse" data-target="#collapse'+totalInstanceNum+'"\
                             class="collapsed">\
                    <span class="pull-left">View Details</span>\
                    <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>\
                    <div class="clearfix"></div>\
                </a>\
                	<button class="btn btn-primary btn-md gcloudStart" value="'+DEFAULT_RETURN_INSTANCE_NAME + '*' + DEFAULT_RETURN_REGION + '*' + DEFAULT_PROJECT +'"> Start </button>\
                    <button class="btn btn-warning btn-md gcloudStop" value="'+DEFAULT_RETURN_INSTANCE_NAME + '*' + DEFAULT_RETURN_REGION + '*' + DEFAULT_PROJECT+'"> Stop </button>\
                    <button class="btn btn-danger btn-md gcloudTerminate" value="'+DEFAULT_RETURN_INSTANCE_NAME + '*' + DEFAULT_RETURN_REGION + '*' + DEFAULT_PROJECT+'"> Terminate </button>\
                    </div>\
                </div>\
            </div>'
		);
	}

	else if(serviceProvider=="aws"){
		var publicIP = "1.1.1.1";
		var detailString = "this is detail";
		$("#instanceList").append(

			'<div class="col-lg-3 col-md-6">\
               <div class="panel panel-yellow">\
                    <div class="panel-heading">\
                        <div class="row">\
                            <div class="col-xs-3">\
                                <i class="fa fa-amazon fa-5x"></i>\
                            </div>\
                            <div class="col-xs-9 text-right">\
                                <div class="huge">AWS EC2</div>\
                                <div>Public IP:'+ publicIP + ' </div>\
                            </div>\
                        </div>\
                    </div>\
                    <div class="panel-footer">\
                       <div class="panel panel-default" id="panel3">\
                            <div id="collapse'+totalInstanceNum+'" class="panel-collapse collapse">\
                                <div class="panel-body">'+detailString +'</div>\
                            </div>\
                        </div>\
                        <a data-toggle="collapse" data-target="#collapse'+totalInstanceNum+'"\
                             class="collapsed">\
                    <span class="pull-left">View Details</span>\
                    <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>\
                    <div class="clearfix"></div>\
                </a>\
                    </div>\
                </div>\
            </div>'
		);
	}

	}






//function creatInstance(){

	








