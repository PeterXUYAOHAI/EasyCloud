/**
 * Created by Ibrahim on 4/4/2016.
 */
var AmazonWebService = (function(){

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

    function init() {
        RegisterListeners();
        defaultRegion = "us-east-1";
        // defaultAvailabilityZone = "us-east-1a";
        regionNames = {
            "us-east-1" : "US East (N. Virginia)",
            "us-west-1" : "US West (N. California)",
            "us-west-2" : "US West (Oregon)",
            "eu-west-1" : "EU (Ireland)",
            "eu-central-1" : "EU (Frankfurt)",
            "ap-northeast-1" : "Asia Pacific (Tokyo)",
            "ap-northeast-2" : "Asia Pacific (Seoul)",
            "ap-southeast-1" : "Asia Pacific (Singapore)",
            "ap-southeast-2" : "Asia Pacific (Sydney)",
            "sa-east-1" : "South America (São Paulo)"
        };
    }

    function RegisterListeners(){

        $("#service_selector").change(function(){
            if($(this).val() == "aws"){
                // if(!accessKey) {
                //     accessKeyElem.closest('.form-group').removeClass('has-success').addClass('has-error');
                //     $("#myModalNorm .error-message").html(
                //         "<div class=\"alert text-left alert-danger alert-dismissible\" role=\"alert\">"+
                //         "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">"+
                //             "<span aria-hidden=\"true\">&times;</span>"+
                //         "</button>"+
                //         "<strong>Error!</strong> Must Enter Public Key "+
                //         "</div>");
                //     return false;
                // }else if(!secretKey){
                //     accessKeyElem.closest('.form-group').removeClass('has-error').addClass('has-success');
                //     secretKeyElem.closest('.form-group').removeClass('has-success').addClass('has-error');
                //     $("#myModalNorm .error-message").html(
                //         "<div class=\""+"alert text-left alert-danger alert-dismissible\""+" role=\"alert\">"+
                //         "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">"+
                //         "<span aria-hidden=\"true\">&times;</span>"+
                //         "</button>"+
                //         "<strong>Error!</strong> Must Enter Secret Key "+
                //         "</div>");
                //     return false;
                // }else{
                // accessKeyElem.closest('.form-group').removeClass('has-error').addClass('has-success');
                // secretKeyElem.closest('.form-group').removeClass('has-error').addClass('has-success');
                // var region = defaultRegion;
                // configureCredentialsAndRegion(accessKey, secretKey, region);
                populateAndDisplayForm();
                    // getUserKeyPairs();
                // }
            }
        });

        // $("#creatButton").click(function(){
        //     if($("#service_selector .selected").attr("id") == "aws"){
        //         $('#KeyModal').modal('show');
        //     }
        // });

        // $("#key_pair_action_selector").change(function(){
        //     var option = $("#key_pair_action_selector").val();
        //     if(option == "existing_key_pair"){
        //         $("#keyPairAction").html(
        //             "<label class=\"control-label\" id=\"key_pair_selector_label\">Select a Key Pair</label>"+
        //             "<select id = \"key_pair_selector\" name=\"language\" class=\"form-control selectpicker\">"+
        //                 "<option value=\"\"></option>"+
        //             "</select>");
        //         $('#key_pair_selector').selectpicker('refresh');
        //         // getUserKeyPairs();
        //     }else if(option == "new_key_pair"){
        //         $("#keyPairAction").html(
        //             "<label id=\"keyPairNameLabel\">Key Pair Name</label>"+
        //             "<input id=\"keyPairName\" type=\"text\" class=\"form-control required\" placeholder=\"Key Pair Name\" />"+
        //             "<button id=\"downloadKeyPair\" type=\"button\" class=\"btn btn-success\" style=\"float:right;margin-top: 15px;\">Download Key Pair</button>");

        //         $("#downloadKeyPair").click(function(){
        //             var keyPairNameElem = $("#keyPairName");
        //             var keyName = keyPairNameElem.val();
        //             if(!keyName) {
        //                 keyPairNameElem.closest('.form-group').removeClass('has-success').addClass('has-error');
        //                 $("#KeyModal .error-message").html(
        //                     "<div class=\"alert text-left alert-danger alert-dismissible\" role=\"alert\">"+
        //                     "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">"+
        //                     "<span aria-hidden=\"true\">&times;</span>"+
        //                     "</button>"+
        //                     "<strong>Error!</strong> Must Enter Valid Key Pair Name "+
        //                     "</div>");
        //                 return false;
        //             }else{
        //                 keyPairNameElem.closest('.form-group').removeClass('has-error').addClass('has-success');
        //                 createKeyPair(keyName);
        //             }
        //         });
        //     }
        // });
    
        //  Create Instance
        // $("#CreateInstanceButton").click(function(){
        $("#creatButton").click(function(){

            // if(KeyPairName == null){
            //     KeyPairName = $("#key_pair_selector").val();
            // }
            var accessKeyElem = $("#awsPublicKey");
            var secretKeyElem = $("#awsSecretKey");
            var accessKey= accessKeyElem.val();
            var secretKey= secretKeyElem.val();
            var region = defaultRegion;
            
            configureCredentialsAndRegion(accessKey, secretKey, region);

            var os = $("#os_selector").val();
            var diskS = $("#diskS_selector").val();
            var instanceType = $("#size_selector").val();

            if(os=="ubuntu")
                awsOS="ami-fce3c696";
            else if (os=="centos")
                awsOS="ami-7ea24a17";
            else if (os=="debian")
                awsOS="ami-5cc5e536";
            else if (os=="suse")
                awsOS="ami-3f093055";
            else if (os=="windows")
                awsOS="ami-3d787d57";

            if(diskS == "small")
                awsDiskSize = 10;
            else if(diskS=="medium")
                awsDiskSize = 30;
            else if(diskS=="large")
                awsDiskSize = 80;

            //  Default 8 GB Hard Disk
            awsDiskSize = awsDiskSize - 8;

            defaultRegion = $("#region_selector").val();

            // defaultAvailabilityZone = $("#availability_zone_selector").val();

            AWS.config.region = defaultRegion;

            var instanceName = os.toUpperCase() + Math.floor((Math.random() * 100) + 1);

            createEC2Instance({ImageId: awsOS, instanceType: instanceType, instanceName: instanceName, instanceDiskSize: awsDiskSize});
            console.log("Create Instance");
        });


    }

    //  http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Credentials.html#constructor-property
    function configureCredentialsAndRegion(accessKey, secretKey, region){
        accessKeyId = accessKey;
        secretAccessKey = secretKey;
        credentials = new AWS.Credentials(accessKeyId, secretAccessKey, null);
        AWS.config.credentials = credentials;

        // Configure the region
        defaultRegion = region;
        AWS.config.region = defaultRegion;

        //  Instantiate an EC2 object
        ec2 = new AWS.EC2();

        console.log(AWS.config);
    }

    function populateAndDisplayForm(){
        $("#bootstrapSelectForm").removeClass("hidden");
        $("#size_selector").html(
            "<option value=\"t2.micro\" selected=\"selected\">Small (t2.micro) </option>"+
            "<option value=\"m3.medium\">Medium (m3.medium) </option>"+
            "<option value=\"m3.large\">Large (m3.large) </option>"+
            "<option value=\"m3.xlarge\">Extra Large (m3.xlarge) </option>"
        );

        $("#size_selector").selectpicker('refresh');

        $("#diskT_selector").html("<option value=\"ssd\">SSD</option>");
        $("#diskT_selector").selectpicker('refresh');

        // getAvailabilityZones(defaultRegion);
        getRegions();
    }

    /*
    * Input: Object
    *
    * Object contains:
    *
    * InstanceType,
    * InstanceName,
    * KeyName
    * */
    //http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/EC2.html#runInstances-property
    function createEC2Instance(instanceObj) {

        console.log("running create instance");
        console.log(instanceObj);

        if(instanceObj==null){
            console.log("missing object");
            return false;
        }

        var params = {
            ImageId: instanceObj.ImageId,
            InstanceType: instanceObj.instanceType,
            // Placement:{
            //     AvailabilityZone: instanceObj.availabilityZone    // Specify the Availability Zone, To specify multiple Availability Zones, separate them using commas; for example, "us-west-2a, us-west-2b".
            // },
            BlockDeviceMappings: [
                {
                    DeviceName: "/dev/sdf",
                    Ebs: {
                        DeleteOnTermination: true,
                        Encrypted: false,
                        VolumeSize: instanceObj.instanceDiskSize,
                        VolumeType: 'gp2'
                    }
                }
            ],
            // KeyName: instanceObj.KeyName,
            InstanceInitiatedShutdownBehavior: 'stop',
            MinCount: 1,    // minimum number of instances to launch
            MaxCount: 1     // maximum number of instances to launch
        };

        // Create the instance
        ec2.runInstances(params, function(err, data) {
            if (err) {
                console.log("Could not create instance", err);
                return;
            }

            var instanceId = data.Instances[0].InstanceId;
            console.log("Created instance", instanceId);

            // Add Name tag to the instance
            params = {Resources: [instanceId], Tags: [
                {Key: 'Name', Value: instanceObj.instanceName}
            ]};
            ec2.createTags(params, function(err) {
                console.log("Tagging instance", err ? "failure" : "success");
            });
            getUserInstances([instanceId]);
            KeyPairName = null;
        });
    }

    /*
    *   Accepts an array of Image IDs to start
    * */
    function startInstance(ImageIds){
        var params = {
            InstanceIds: ImageIds
        };

        ec2.startInstances(params, function(err, data){
            if(err){
                console.log(err, err.stack);
            }
            else{
                console.log(data);
                var instanceId = data.StartingInstances[0].InstanceId;
                console.log(instanceId + " started..");
                $("#"+instanceId+"Status").html(data.StartingInstances[0].CurrentState.Name);
                waitForInstanceStart([instanceId]);
            }
        });

    }

    function stopInstance(InstanceIds){
        var params = {
            InstanceIds: InstanceIds,
            DryRun: false,
            Force: false
        };
        ec2.stopInstances(params, function(err, data) {
            if (err){
                console.log(err, err.stack);    // an error occurred
            }
            else{
                console.log(data);  // successful response
                var instanceId = data.StoppingInstances[0].InstanceId;
                console.log(instanceId + " stopped..");
                $("#"+instanceId+"Status").html(data.StoppingInstances[0].CurrentState.Name);
                waitForInstanceStop([instanceId]);
            }
        });
    }

    function terminateInstance(InstanceIds){
        var params = {
            InstanceIds: InstanceIds,
            DryRun: false
        };
        ec2.terminateInstances(params, function(err, data) {
            if (err){
                console.log(err, err.stack);     // an error occurred
            }
            else{
                console.log(data);  // successful response
                var instanceId = data.TerminatingInstances[0].InstanceId;
                console.log(instanceId + " terminated..");
                $("#"+instanceId+"Status").html(data.TerminatingInstances[0].CurrentState.Name);
                waitForInstanceTerminate([instanceId]);
                $("#"+instanceId).remove();
            }
        });
    }

    //  Get all instances belonging to the user
    //  http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/EC2.html#describeInstances-property
    function getUserInstances(InstanceIds){
        AllUserInstances = [];
        console.log(InstanceIds);
        if(InstanceIds != null)
            var params = {
                DryRun: false,
                InstanceIds: InstanceIds
            };
        else
            var params = {
                DryRun: false
            };

        console.log(params);

        ec2.describeInstances(params, function(err, data){
            if (err){
                console.log(err, err.stack); // an error occurred
            }
            else{
                console.log(data);           // successful response
                $.each(data.Reservations, function(key, group){
                    // console.log(key);
                    // console.log(group);
                    $.each(group.Instances, function(position, instance){
                        // console.log(position);
                        // console.log(instance);
                        var detailString = createDetailString(instance);
                        console.log(detailString);
                        createBlock(detailString, instance);
                        waitForInstanceStart([instance.InstanceId]);
                        buttonListenerFresh();
                        AllUserInstances.push(instance);
                    });
                });
            }
            console.log(AllUserInstances);
        });
    }

    //  Get all the regions
    //  http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/EC2.html#describeRegions-property
    function getRegions(){
        var params = {
            DryRun: false
        };

        App.blockUI({
            target: "#bootstrapSelectForm",
            animate: true
        });

        ec2.describeRegions(params, function(err, data) {
            if (err)
                console.log(err, err.stack); // an error occurred
            else{
                console.log(data);           // successful response
                $("#region_selector").empty();
                $.each(data.Regions, function(index, obj){
                    if(obj.RegionName == defaultRegion)
                        $("#region_selector").append("<option value='"+obj.RegionName+"' selected>"+decodeURIComponent(encodeURIComponent(regionNames[obj.RegionName]))+"</option>");
                    else
                        $("#region_selector").append("<option value='"+obj.RegionName+"'>"+decodeURIComponent(encodeURIComponent(regionNames[obj.RegionName]))+"</option>");
                });
                $('#region_selector').selectpicker('refresh');
            }
            App.unblockUI("#bootstrapSelectForm");
        });
    }

    //Get all the availability zones in a region
    //  http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/EC2.html#describeAvailabilityZones-property
    function getAvailabilityZones(region){
        var params = {
            DryRun: false,
            Filters: [
                {
                    Name: 'region-name',
                    Values: [
                        region
                    ]
                }
            ]
        };
        ec2.describeAvailabilityZones(params, function(err, data) {
            if (err)
                console.log(err, err.stack); // an error occurred
            else{
                console.log(data);           // successful response
                $("#availability_zone_selector").empty();
                $.each(data.AvailabilityZones, function(index, obj){
                    if(obj.State == "available"){
                        $("#availability_zone_selector").append("<option value='"+obj.ZoneName+"'>"+obj.ZoneName+"</option>");
                    }
                });
                $("#availability_zone_selector").selectpicker("refresh");
            }
        });
    }

    function createKeyPair(keyName) {
        var keyObj = {};
        var params = {
            KeyName: keyName, /* required */
            DryRun: false
        };

        ec2.createKeyPair(params, function(err, data) {
            if (err){
                console.log(err, err.stack);    // an error occurred}
            }
            else{
                // console.log(data);  // successful response
                var privateKeyString = data.KeyMaterial.match("(\-\-\-\-\-BEGIN RSA PRIVATE KEY\-\-\-\-\-)([\\s\\S]*)(\-\-\-\-\-END RSA PRIVATE KEY\-\-\-\-\-)")[2];
                privateKeyString = privateKeyString.replace(/^\s+|\s+$/gm,'');
                $.extend(keyObj, {
                    KeyFingerprint: data.KeyFingerprint,
                    KeyName: data.KeyName,
                    PrivateKey: privateKeyString
                });

                KeyPairName = data.KeyName;
                window.prompt("Copy Private Key Below and Save as .pem file", privateKeyString);
            }
        });
    }

    function getUserKeyPairs(){
        var params = {
            DryRun: false
        };
        App.blockUI({
            target: "#KeyPairForm",
            animate: true
        });
        ec2.describeKeyPairs(params, function(err, data) {
            if (err){
                console.log(err, err.stack);    // an error occurred
            }
            else{
                console.log(data);  // successful response
                $("#key_pair_selector").empty();
                $.each(data.KeyPairs, function(index, obj){
                    $("#key_pair_selector").append("<option value='"+obj.KeyName+"'>"+obj.KeyName+"</option>")
                });
                $("#key_pair_selector").selectpicker("refresh");
            }
            App.unblockUI("#KeyPairForm");
        });
    }

    //  Get all images available to the user
    //  http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/EC2.html#describeImages-property
    function getAllImages(){
        var params = {
            Filters:[
                {
                    Name: "block-device-mapping.volume-size",
                    Values:[
                        "100"
                    ]
                }
            ]
        };
        console.log("running get all images");
        App.blockUI({
            animate: true
        });
        ec2.describeImages(params, function(err, data) {
            if (err)
                console.log(err, err.stack); // an error occurred
            else{
                console.log(data);           // successful response
            }
            App.unblockUI();
        });
    }

    function createDetailString(instance){

        var creationTime = instance.LaunchTime;
        var imageId = instance.ImageId;
        var innerIpAddress = instance.PrivateIpAddress;
        var instanceId = instance.InstanceId;
        var instanceType = instance.InstanceType;
        var publicIpAddress = instance.PublicIpAddress;
        var regionId = instance.Placement.AvailabilityZone;
        var status = instance.State.Name;

        var detailHtmlString=''+
            '<div class="list-group text-left">'+
            '<a class="list-group-item">'+
            '<i class="fa fa-power-off fa-fw"></i> Status'+
            '<span class="pull-right text-primary"><em id="'+instanceId+'Status">'+ status +'</em>'+
            '</span>'+
            '</a>'+
            '<a class="list-group-item">'+
            '<i class="fa fa-cloud fa-fw"></i> Service Provider'+
            '<span class="pull-right text-muted small"><em>'+ serviceProvider +'</em>'+
            '</span>'+
            '</a>'+
            '<a class="list-group-item">'+
            '<i class="fa fa-sellsy fa-fw"></i> Instance Type'+
            '<span class="pull-right text-muted small"><em>'+ instanceType +'</em>'+
            '</span>'+
            '</a>'+
            '<a class="list-group-item">'+
            '<i class="fa fa-cloud fa-fw"></i> Instance Id'+
            '<span class="pull-right text-muted small"><em>'+ instanceId +'</em>'+
            '</span>'+
            '</a>'+
            '<a class="list-group-item">'+
            '<i class="fa fa-angle-double-up fa-fw"></i> Public IP<span class="pull-right text-muted small"><em>'+publicIpAddress+'</em>'+
            '</span>'+
            '</a>'+
            '<a class="list-group-item">'+
            '<i class="fa fa-angle-up fa-fw"></i> Inner IP<span class="pull-right text-muted small"><em>'+innerIpAddress+'</em>'+
            '</span>'+
            '</a>'+
            '<a class="list-group-item">'+
            '<i class="fa fa-map fa-fw"></i> Region Id<span class="pull-right text-muted small"><em>'+regionId+'</em>'+
            '</span>'+
            '</a>'+
            '<a class="list-group-item">'+
            '<i class="fa fa-desktop fa-fw"></i> Image Id'+
            '<span class="pull-right text-muted small"><em></em>'+
            '</span>'+
            '<p class="text-muted small">'+ imageId +'</p>'+
            '</a>'+
            '<a class="list-group-item">'+
            '<i class="fa fa-clock-o fa-fw"></i> Creation Time'+
            '<span class="pull-right text-muted small"><em>'+creationTime+'</em>'+
            '</span>'+
            '</a>'+
            '</div>';

        return detailHtmlString;
    }

    function createBlock(detailString, instance){
        if($("#service_selector .selected").attr("id") == "aws"){
            console.log("Creating ");
            var instanceId = instance.InstanceId;
            var publicIP = instance.PublicIpAddress;
            var innerIp = instance.PrivateIpAddress;
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
                                <div class="huge">AWS EC2</div>\
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
                	<button class="btn btn-primary btn-md awsStart" value="'+instanceId+'"> Start </button>\
                    <button class="btn btn-warning btn-md awsStop" value="'+instanceId+'"> Stop </button>\
                    <button class="btn btn-danger btn-md awsTerminate" value="'+instanceId+'"> Terminate </button>\
                    </div>\
                </div>\
            </div>\
            </div>'
            );
        }
    }

    function waitForInstanceStart(InstanceIds){
        console.log("waiting for start");
        if(InstanceIds != null)
            var params = {
                DryRun: false,
                InstanceIds: InstanceIds
            };
        else
            var params = {
                DryRun: false
            };

        ec2.waitFor('instanceRunning', params, function(err, data) {
            if (err) {
                console.log(err, err.stack); // an error occurred
            }
            else{
                console.log(data);  // successful response

                $("#"+data.Reservations[0].Instances[0].InstanceId+"Status").html(data.Reservations[0].Instances[0].State.Name);
            }
        });
    }

    function waitForInstanceStop(InstanceIds){
        console.log("waiting for stop");
        if(InstanceIds != null)
            var params = {
                DryRun: false,
                InstanceIds: InstanceIds
            };
        else
            var params = {
                DryRun: false
            };

        ec2.waitFor('instanceStopped', params, function(err, data) {
            if (err) {
                console.log(err, err.stack); // an error occurred
            }
            else{
                console.log(data);  // successful response

                $("#"+data.Reservations[0].Instances[0].InstanceId+"Status").html(data.Reservations[0].Instances[0].State.Name);
            }
        });
    }

    function waitForInstanceTerminate(InstanceIds){
        console.log("waiting for terminate");
        if(InstanceIds != null)
            var params = {
                DryRun: false,
                InstanceIds: InstanceIds
            };
        else
            var params = {
                DryRun: false
            };

        ec2.waitFor('instanceTerminated', params, function(err, data) {
            if (err) {
                console.log(err, err.stack); // an error occurred
            }
            else{
                console.log(data);  // successful response

                $("#"+data.Reservations[0].Instances[0].InstanceId+"Status").html(data.Reservations[0].Instances[0].State.Name);
            }
        });
    }

    function buttonListenerFresh(){
        $(".awsStart").click(function(){
            alert("start button is clicked");
            var instanceId = $(this).val();
            console.log("instance Id retrieved: "+ instanceId);
            startInstance([instanceId]);
        });


        $(".awsStop").click(function(){
            alert("stop button is clicked");
            var instanceId = $(this).val();
            console.log("instance Id retrieved: "+ instanceId);
            stopInstance([instanceId]);
        });

        $(".awsTerminate").click(function(){
            alert("terminate button is clicked");
            var instanceId = $(this).val();
            console.log("instance Id retrieved: "+ instanceId);
            terminateInstance([instanceId]);
        });
    }


    return{
        init: init
    }
});
