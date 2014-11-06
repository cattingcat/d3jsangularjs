define([], function() {
	'use strict';
	var factory = function($scope, $log){
		$scope.data = {
			"quadrant" : "Cache",
			"items": [
                {
                    "name": "Velocity",
                    "movement": "Stable",
                    "maturity": "Use",
                    "source": {
                        "practical": 5,
                        "theoretical": 4
                    },
                    id: 1
                },
				{
				    "name": "Redis",
				    "movement": "Down",
				    "maturity": "Use",
				    "source": {
				        "practical": 0,
				        "theoretical": 4
				    },
				    id: 6
				},
				{
				    "name": "Azure Cache Service",
				    "movement": "Up",
				    "maturity": "Use with care",
				    "source": {
				        "practical": 5,
				        "theoretical": 3
				    },
				    id: 7
				},
				{
				    "name": "Memcached",
				    "movement": "Stable",
				    "maturity": "Be informed",
				    "source": {
				        "practical": 1,
				        "theoretical": 5
				    },
				    id: 9
				}
				//{
				//	"name" : "Velocity",
				//	"movement" : "Stable",
				//	"maturity" : "Use",
				//	"source" : {
				//		"practical" : 1,
				//		"theoretical" :1
				//	},
				//	id : 1
				//},
				//{
				//	"name" : "Redis",
				//	"movement" : "Down",
				//	"maturity" : "Use",
				//	"source" : {
				//		"practical" : 4,
				//		"theoretical" : 1
				//	},
				//	id : 2
				//},
				//{
				//	"name" : "Azure Cache Service",
				//	"movement" : "Up",
				//	"maturity" : "Use",
				//	"source" : {
				//		"practical" : 5,
				//		"theoretical" : 3
				//	},
				//	id : 3
				//},
				//{
				//	"name" : "Memcached",
				//	"movement" : "Stable",
				//	"maturity" : "Use",
				//	"source" : {
				//		"practical" : 1,
				//		"theoretical" : 5
				//	}, 
				//	id : 4
				//},
				//{
				//    "name": "Microsoft Service",
				//    "movement": "Stable",
				//    "maturity": "Use",
				//    "source": {
				//        "practical": 19,
				//        "theoretical": 3
				//    },
				//    id: 5
				//},
				//{
				//    "name": "Google Chrom Service",
				//    "movement": "Stable",
				//    "maturity": "Use",
				//    "source": {
				//        "practical": 1,
				//        "theoretical": 19
				//    },
				//    id: 6
				//},
				//{
				//    "name": "Google Chrom Service 2",
				//    "movement": "Stable",
				//    "maturity": "Use with care",
				//    "source": {
				//        "practical": 1,
				//        "theoretical": 10
				//    },
				//    id: 7
				//},
				//{
				//    "name": "Google Chrom Service 3",
				//    "movement": "Down",
				//    "maturity": "Be informed",
				//    "source": {
				//        "practical": 1,
				//        "theoretical": 5
				//    },
				//    id: 8
				//},
				//{
				//    "name": "Google Chrom Service 4",
				//    "movement": "Down",
				//    "maturity": "Avoid",
				//    "source": {
				//        "practical": 1,
				//        "theoretical": 4
				//    },
				//    id: 9
				//}
			]
		};
		$scope.filter = {
			trend: 'All',
			recommendation: 'All'
		};

	    $scope.circleData = [{ "quadrant": "Search", "angleStart": 3, "angleEnd": 21, "left": "15", "top": "18", "color": "#f58a97", "items": [{ "name": "SOLR", "description": "Open", "movement": "Up", "maturity": "Use", "color": "#f58a97", "pc": { "r": 0, "t": 0 }, "url": "http://en.wikipedia.org/wiki/Solr#", "source": { "practical": 8, "theoretical": 6 }, "itemId": 18, "$$hashKey": "01Y" }], "$$hashKey": "01H" }, { "quadrant": "Business Logic & Workflow", "angleStart": 21, "angleEnd": 39, "left": "15+210", "top": "18", "color": "#d1b08a", "items": [{ "name": "Microsoft BizTalk", "description": "--", "movement": "Stable", "maturity": "Use", "color": "#d1b08a", "pc": { "r": 0, "t": 0 }, "url": "http://en.wikipedia.org/wiki/BizTalk#", "source": { "practical": 0, "theoretical": 5 }, "itemId": 28, "$$hashKey": "021" }, { "name": "Workflow Manager", "description": "--", "movement": "Up", "maturity": "Use with care", "color": "#d1b08a", "pc": { "r": 0, "t": 0 }, "url": "http://blogs.msdn.com/b/workflowteam/archive/2013/05/16/new-workflow-manager-1-0-getting-started-tutorial.aspx#", "source": { "practical": 2, "theoretical": 1 }, "itemId": 31, "$$hashKey": "022" }, { "name": "Azure BizTalk Services", "description": "Simple, powerful, and extensible cloud-based integration service that provides Business-to-Business (B2B) and Enterprise Application Integration (EAI) capabilities for delivering cloud and hybrid integration solutions.", "movement": "Up", "maturity": "Be informed", "color": "#d1b08a", "pc": { "r": 0, "t": 0 }, "url": "http://www.windowsazure.com/en-us/services/biztalk-services/#", "source": { "practical": 0, "theoretical": 4 }, "itemId": 32, "$$hashKey": "023" }], "$$hashKey": "01I" }, { "quadrant": "Cache", "angleStart": 39, "angleEnd": 57, "left": "15+420", "top": "18", "color": "#f5844e", "items": [{ "name": "Memcached", "description": "General-purpose distributed memory caching system", "movement": "Stable", "maturity": "Use", "color": "#f5844e", "pc": { "r": 0, "t": 0 }, "url": "http://en.wikipedia.org/wiki/Memcached#", "source": { "practical": 1, "theoretical": 5 }, "itemId": 15, "$$hashKey": "028" }, { "name": "Velocity(AppFabric Cache)", "description": "In-memory, distributed cache platform for Windows Server", "movement": "Stable", "maturity": "Use", "color": "#f5844e", "pc": { "r": 0, "t": 0 }, "url": "http://en.wikipedia.org/wiki/AppFabric_Caching#", "source": { "practical": 0, "theoretical": 4 }, "itemId": 16, "$$hashKey": "029" }, { "name": "Redis", "description": "Open-source, networked, in-memory, key-value data store with optional durability", "movement": "Stable", "maturity": "Use with care", "color": "#f5844e", "pc": { "r": 0, "t": 0 }, "url": "http://en.wikipedia.org/wiki/Redis#", "source": { "practical": 0, "theoretical": 4 }, "itemId": 17, "$$hashKey": "02A" }, { "name": "Azure Cache Service", "description": "--", "movement": "Up", "maturity": "Use with care", "color": "#f5844e", "pc": { "r": 0, "t": 0 }, "url": null, "source": { "practical": 0, "theoretical": 3 }, "itemId": 56, "$$hashKey": "02B" }], "$$hashKey": "01J" }, { "quadrant": "Services & Communications", "angleStart": 57, "angleEnd": 75, "left": "15+645", "top": "18", "color": "#f9a94a", "items": [{ "name": "Oracle Service Bus", "description": "Enterprise Service Bus implementation by Oracle", "movement": "Stable", "maturity": "Use", "color": "#f9a94a", "pc": { "r": 0, "t": 0 }, "url": "http://en.wikipedia.org/wiki/Oracle_Service_Bus#", "source": { "practical": 0, "theoretical": 2 }, "itemId": 27, "$$hashKey": "02H" }, { "name": "RabbitMQ", "description": "Open source message broker software that implements AMQP Protocol", "movement": "Up", "maturity": "Use with care", "color": "#f9a94a", "pc": { "r": 0, "t": 0 }, "url": "https://www.rabbitmq.com/#", "source": { "practical": 2, "theoretical": 3 }, "itemId": 20, "$$hashKey": "02I" }, { "name": "Windows Service Bus", "description": "Set of installable components that provides the messaging capabilities of Windows Azure Service Bus on Windows", "movement": "Up", "maturity": "Use with care", "color": "#f9a94a", "pc": { "r": 0, "t": 0 }, "url": "http://msdn.microsoft.com/en-us/library/windowsazure/dn282144.aspx#", "source": { "practical": 1, "theoretical": 5 }, "itemId": 21, "$$hashKey": "02J" }, { "name": "Azure Service Bus", "description": "--", "movement": "Up", "maturity": "Use with care", "color": "#f9a94a", "pc": { "r": 0, "t": 0 }, "url": "http://www.windowsazure.com/en-us/services/messaging/#", "source": { "practical": 1, "theoretical": 6 }, "itemId": 22, "$$hashKey": "02K" }, { "name": "Microsoft BizTalk", "description": "Created by Microsoft, it provides enterprise application integration, business process automation, business-to-business communication, message broker and business activity monitoring.", "movement": "Stable", "maturity": "Use", "color": "#f9a94a", "pc": { "r": 0, "t": 0 }, "url": "http://en.wikipedia.org/wiki/BizTalk#", "source": { "practical": 0, "theoretical": 5 }, "itemId": 26, "$$hashKey": "02L" }, { "name": "Tibco EMS", "description": "--", "movement": "Stable", "maturity": "Use", "color": "#f9a94a", "pc": { "r": 0, "t": 0 }, "url": null, "source": { "practical": 1, "theoretical": 2 }, "itemId": 52, "$$hashKey": "02M" }], "$$hashKey": "01K" }, { "quadrant": "Custom components", "angleStart": 75, "angleEnd": 93, "left": "15+860", "top": "18", "color": "#a4d165", "items": [{ "name": "Native:Mobile", "description": "Native apps for mobile devices", "movement": "Up", "maturity": "Use", "color": "#a4d165", "pc": { "r": 0, "t": 0 }, "url": null, "source": { "practical": 4, "theoretical": 2 }, "itemId": 1, "$$hashKey": "02U" }, { "name": "Native:Desktop", "description": "Native apps for desktop computers(notebooks included)", "movement": "Down", "maturity": "Use", "color": "#a4d165", "pc": { "r": 0, "t": 0 }, "url": null, "source": { "practical": 7, "theoretical": 0 }, "itemId": 2, "$$hashKey": "02V" }, { "name": "Web Services (no UI)", "description": "Service applications", "movement": "Stable", "maturity": "Use", "color": "#a4d165", "pc": { "r": 0, "t": 0 }, "url": null, "source": { "practical": 6, "theoretical": 0 }, "itemId": 3, "$$hashKey": "02W" }, { "name": "System Service (no UI)", "description": "Windows Service", "movement": "Stable", "maturity": "Use", "color": "#a4d165", "pc": { "r": 0, "t": 0 }, "url": null, "source": { "practical": 6, "theoretical": 0 }, "itemId": 4, "$$hashKey": "02X" }, { "name": "Web:Mobile", "description": "Web applications optimized for mobile devices", "movement": "Up", "maturity": "Use", "color": "#a4d165", "pc": { "r": 0, "t": 0 }, "url": null, "source": { "practical": 1, "theoretical": 5 }, "itemId": 5, "$$hashKey": "02Y" }, { "name": "Web:Desktop", "description": "Web applications", "movement": "Stable", "maturity": "Use", "color": "#a4d165", "pc": { "r": 0, "t": 0 }, "url": null, "source": { "practical": 7, "theoretical": 0 }, "itemId": 6, "$$hashKey": "02Z" }, { "name": "Wearable technologies", "description": "--", "movement": "Up", "maturity": "Be informed", "color": "#a4d165", "pc": { "r": 0, "t": 0 }, "url": null, "source": { "practical": 0, "theoretical": 4 }, "itemId": 55, "$$hashKey": "030" }], "$$hashKey": "01L" }, { "quadrant": "Security", "angleStart": 93, "angleEnd": 115, "left": "15+1130", "top": "18", "color": "#3bfd99", "items": [{ "name": "AD FS", "description": "software component developed by Microsoft that can be installed on Windows Server operating systems to provide users with single sign-on access to systems and applications located across organizational boundaries. It uses a claims-based access control authorization model to maintain application security and implement federated identity", "movement": "Stable", "maturity": "Use", "color": "#3bfd99", "pc": { "r": 0, "t": 0 }, "url": "http://en.wikipedia.org/wiki/Active_Directory_Federation_Services#", "source": { "practical": 4, "theoretical": 3 }, "itemId": 43, "$$hashKey": "039" }, { "name": "AD FS proxy", "description": "--", "movement": "Up", "maturity": "Use", "color": "#3bfd99", "pc": { "r": 0, "t": 0 }, "url": null, "source": { "practical": 2, "theoretical": 0 }, "itemId": 44, "$$hashKey": "03A" }, { "name": "AD DS", "description": "--", "movement": "Stable", "maturity": "Use", "color": "#3bfd99", "pc": { "r": 0, "t": 0 }, "url": "http://en.wikipedia.org/wiki/Active_Directory_Federation_Services#", "source": { "practical": 3, "theoretical": 1 }, "itemId": 45, "$$hashKey": "03B" }, { "name": "UAG(Forefront)", "description": "family of line-of-business security software by Microsoft Corporation. Microsoft Forefront products are designed to help protect computer networks, network servers (such as Microsoft Exchange Server and Microsoft SharePoint Server) and individual devices.", "movement": "Stable", "maturity": "Use with care", "color": "#3bfd99", "pc": { "r": 0, "t": 0 }, "url": "http://en.wikipedia.org/wiki/Microsoft_Forefront#", "source": { "practical": 1, "theoretical": 2 }, "itemId": 46, "$$hashKey": "03C" }, { "name": "PingIdentity", "description": "--", "movement": "Stable", "maturity": "Use with care", "color": "#3bfd99", "pc": { "r": 0, "t": 0 }, "url": "https://www.pingidentity.com/#", "source": { "practical": 0, "theoretical": 2 }, "itemId": 47, "$$hashKey": "03D" }, { "name": "IdentityServer", "description": "--", "movement": "Stable", "maturity": "Be informed", "color": "#3bfd99", "pc": { "r": 0, "t": 0 }, "url": "http://thinktecture.github.io/Thinktecture.IdentityServer.v2/#", "source": { "practical": 0, "theoretical": 2 }, "itemId": 48, "$$hashKey": "03E" }, { "name": "Shibboleth Identity/Service Provider", "description": "--", "movement": "Stable", "maturity": "Use with care", "color": "#3bfd99", "pc": { "r": 0, "t": 0 }, "url": null, "source": { "practical": 0, "theoretical": 1 }, "itemId": 53, "$$hashKey": "03F" }, { "name": "ASP.NET Identity", "description": "--", "movement": "Stable", "maturity": "Use with care", "color": "#3bfd99", "pc": { "r": 0, "t": 0 }, "url": null, "source": { "practical": 0, "theoretical": 2 }, "itemId": 54, "$$hashKey": "03G" }], "$$hashKey": "01M" }, { "quadrant": "CMS", "angleStart": 115, "angleEnd": 133, "left": "15", "top": "18+300-76", "color": "#70e348", "items": [{ "name": "Umbraco", "description": "Open source content management system (CMS) platform for publishing content on the World Wide Web and intranets", "movement": "Stable", "maturity": "Use with care", "color": "#70e348", "pc": { "r": 0, "t": 0 }, "url": "http://en.wikipedia.org/wiki/Umbraco#", "source": { "practical": 0, "theoretical": 2 }, "itemId": 33, "$$hashKey": "03Q" }, { "name": "Orchard ", "description": "free, open source, community-focused content management system written in ASP.NET platform using the ASP.NET MVC framework", "movement": "Stable", "maturity": "Be informed", "color": "#70e348", "pc": { "r": 0, "t": 0 }, "url": "http://en.wikipedia.org/wiki/Orchard_Project#", "source": { "practical": 0, "theoretical": 1 }, "itemId": 34, "$$hashKey": "03R" }, { "name": "DotNetNuke", "description": "web content management system based on Microsoft .NET. The Community Edition is open source", "movement": "Stable", "maturity": "Use with care", "color": "#70e348", "pc": { "r": 0, "t": 0 }, "url": "http://en.wikipedia.org/wiki/DotNetNuke#", "source": { "practical": 1, "theoretical": 2 }, "itemId": 35, "$$hashKey": "03S" }, { "name": "kentico", "description": "web content management system (WCMS) for building web sites, on-line stores, intranets and Web 2.0 community sites", "movement": "Stable", "maturity": "Use", "color": "#70e348", "pc": { "r": 0, "t": 0 }, "url": "http://www.kentico.com/#", "source": { "practical": 0, "theoretical": 1 }, "itemId": 36, "$$hashKey": "03T" }, { "name": "sitecore", "description": "web content management system and customer experience management software company that provides enterprise website, intranet, portal and marketing automation software", "movement": "Stable", "maturity": "Use", "color": "#70e348", "pc": { "r": 0, "t": 0 }, "url": "http://www.sitecore.net/#", "source": { "practical": 0, "theoretical": 2 }, "itemId": 37, "$$hashKey": "03U" }, { "name": "SharePoint", "description": "Web application platform developed by Microsoft", "movement": "Stable", "maturity": "Use", "color": "#70e348", "pc": { "r": 0, "t": 0 }, "url": "http://en.wikipedia.org/wiki/Microsoft_SharePoint#", "source": { "practical": 2, "theoretical": 4 }, "itemId": 38, "$$hashKey": "03V" }, { "name": "WordPress", "description": "free and open source blogging tool and a content management system (CMS) based on PHP and MySQL, which runs on a web hosting service", "movement": "Stable", "maturity": "Use", "color": "#70e348", "pc": { "r": 0, "t": 0 }, "url": "http://en.wikipedia.org/wiki/WordPress#", "source": { "practical": 0, "theoretical": 0 }, "itemId": 39, "$$hashKey": "03W" }, { "name": "Adobe CQ", "description": "large-scale web content management system that is currently available from Adobe Systems", "movement": "Stable", "maturity": "Use", "color": "#70e348", "pc": { "r": 0, "t": 0 }, "url": "http://en.wikipedia.org/wiki/Day_Software#", "source": { "practical": 0, "theoretical": 4 }, "itemId": 41, "$$hashKey": "03X" }, { "name": "Drupal", "description": "free and open-source content management framework written in PHP and distributed under the GNU General Public License", "movement": "Stable", "maturity": "Use", "color": "#70e348", "pc": { "r": 0, "t": 0 }, "url": null, "source": { "practical": 0, "theoretical": 2 }, "itemId": 42, "$$hashKey": "03Y" }], "$$hashKey": "01N" }, { "quadrant": "Data Storage", "angleStart": 133, "angleEnd": 178, "left": "15+210", "top": "18+300-76", "color": "#33bef2", "items": [{ "name": "Microsoft SQL Server Compact ", "description": "Inproc compact relational database produced by Microsoft for applications that run on mobile devices and desktops.", "movement": "Stable", "maturity": "Use", "color": "#33bef2", "pc": { "r": 0, "t": 0 }, "url": "http://en.wikipedia.org/wiki/SQL_Server_Compact#", "source": { "practical": 3, "theoretical": 4 }, "itemId": 7, "$$hashKey": "049" }, { "name": "MySQL", "description": "The world's second most widely used open-source relational database management system (RDBMS)", "movement": "Stable", "maturity": "Use", "color": "#33bef2", "pc": { "r": 0, "t": 0 }, "url": "http://en.wikipedia.org/wiki/MySQL#", "source": { "practical": 1, "theoretical": 6 }, "itemId": 8, "$$hashKey": "04A" }, { "name": "Microsoft SQL Server", "description": "Microsoft SQL Server is a relational database management system developed by Microsoft.", "movement": "Stable", "maturity": "Use", "color": "#33bef2", "pc": { "r": 0, "t": 0 }, "url": "http://en.wikipedia.org/wiki/Microsoft_SQL_Server#", "source": { "practical": 9, "theoretical": 0 }, "itemId": 9, "$$hashKey": "04B" }, { "name": "Oracle", "description": "Object-relational database management system produced and marketed by Oracle Corporation", "movement": "Stable", "maturity": "Use", "color": "#33bef2", "pc": { "r": 0, "t": 0 }, "url": "http://en.wikipedia.org/wiki/Oracle_Database#", "source": { "practical": 4, "theoretical": 4 }, "itemId": 10, "$$hashKey": "04C" }, { "name": "MongoDB", "description": "Cross-platform document-oriented database system. Classified as a NoSQL database", "movement": "Up", "maturity": "Use", "color": "#33bef2", "pc": { "r": 0, "t": 0 }, "url": "http://en.wikipedia.org/wiki/MongoDB#", "source": { "practical": 1, "theoretical": 4 }, "itemId": 11, "$$hashKey": "04D" }, { "name": "RavenDB", "description": "--", "movement": "Up", "maturity": "Use with care", "color": "#33bef2", "pc": { "r": 0, "t": 0 }, "url": null, "source": { "practical": 1, "theoretical": 3 }, "itemId": 14, "$$hashKey": "04E" }, { "name": "PostgreSQL", "description": "Open-source ORDBMS with an emphasis on extensibility and standards-compliance", "movement": "Stable", "maturity": "Use", "color": "#33bef2", "pc": { "r": 0, "t": 0 }, "url": "http://en.wikipedia.org/wiki/PostgreSQL#", "source": { "practical": 1, "theoretical": 5 }, "itemId": 12, "$$hashKey": "04F" }, { "name": "Azure SQL", "description": "Cloud-based service from Microsoft offering data-storage capabilities", "movement": "Up", "maturity": "Use with care", "color": "#33bef2", "pc": { "r": 0, "t": 0 }, "url": "http://en.wikipedia.org/wiki/SQL_Azure#", "source": { "practical": 2, "theoretical": 5 }, "itemId": 13, "$$hashKey": "04G" }, { "name": "HTML Web Database/IndexedDb", "description": "--", "movement": "Up", "maturity": "Use with care", "color": "#33bef2", "pc": { "r": 0, "t": 0 }, "url": null, "source": { "practical": 0, "theoretical": 2 }, "itemId": 49, "$$hashKey": "04H" }, { "name": "Azure Storage", "description": "--", "movement": "Up", "maturity": "Use", "color": "#33bef2", "pc": { "r": 0, "t": 0 }, "url": null, "source": { "practical": 1, "theoretical": 3 }, "itemId": 50, "$$hashKey": "04I" }, { "name": "Hadoop (+HBase, Hive etc)", "description": "--", "movement": "Up", "maturity": "Use", "color": "#33bef2", "pc": { "r": 0, "t": 0 }, "url": null, "source": { "practical": 0, "theoretical": 3 }, "itemId": 51, "$$hashKey": "04J" }, { "name": "SQLite", "description": "--", "movement": "Stable", "maturity": "Use", "color": "#33bef2", "pc": { "r": 0, "t": 0 }, "url": null, "source": { "practical": 1, "theoretical": 0 }, "itemId": 59, "$$hashKey": "04K" }], "$$hashKey": "01O" }];

		$scope.circleData1 = [
			{
				"quadrant" : "Test",
				"items" : [
					{
						"name" : "Velocity",
						"movement" : "Stable",
						"maturity" : "Use",
						"source" : {
							"practical" : 0,
							"theoretical" : 4
						},
					},
				]
			},
			{
				"quadrant" : "Cache",
				"items" : [
					{
						"name" : "Velocity1",
						"movement" : "Stable",
						"maturity" : "Use",
						"source" : {
							"practical" : 0,
							"theoretical" : 4
						},
					},
					{
						"name" : "Velocity2",
						"movement" : "Stable",
						"maturity" : "Use",
						"source" : {
							"practical" : 0,
							"theoretical" : 4
						},
					},
					{
						"name" : "Velocity3",
						"movement" : "Stable",
						"maturity" : "Use",
						"source" : {
							"practical" : 0,
							"theoretical" : 4
						},
					},
					{
						"name" : "Velocity4",
						"movement" : "Stable",
						"maturity" : "Use",
						"source" : {
							"practical" : 0,
							"theoretical" : 4
						},
					},
					{
						"name" : "Velocity5",
						"movement" : "Stable",
						"maturity" : "Use",
						"source" : {
							"practical" : 0,
							"theoretical" : 4
						},
					},
					{
						"name" : "Velocity6",
						"movement" : "Stable",
						"maturity" : "Use",
						"source" : {
							"practical" : 0,
							"theoretical" : 4
						},
					},
					{
						"name" : "Velocity7",
						"movement" : "Stable",
						"maturity" : "Use",
						"source" : {
							"practical" : 0,
							"theoretical" : 4
						},
					},
					{
						"name" : "Velocity8",
						"movement" : "Stable",
						"maturity" : "Use",
						"source" : {
							"practical" : 0,
							"theoretical" : 4
						},
					},
					{
						"name" : "Velocity9",
						"movement" : "Stable",
						"maturity" : "Use",
						"source" : {
							"practical" : 0,
							"theoretical" : 4
						},
					},
					{
						"name" : "Velocity10",
						"movement" : "Stable",
						"maturity" : "Use",
						"source" : {
							"practical" : 0,
							"theoretical" : 4
						},
					},
					{
						"name" : "Velocity11",
						"movement" : "Stable",
						"maturity" : "Use",
						"source" : {
							"practical" : 0,
							"theoretical" : 4
						},
					},
					{
						"name" : "Velocity12",
						"movement" : "Stable",
						"maturity" : "Use",
						"source" : {
							"practical" : 0,
							"theoretical" : 4
						},
					},
					{
						"name" : "Redis",
						"movement" : "Stable",
						"maturity" : "Use with care",
						"source" : {
							"practical" : 0,
							"theoretical" : 4
						},
					},
					{
						"name" : "Azure Cache Service",
						"movement" : "Up",
						"maturity" : "Use with care",
						"source" : {
							"practical" : 0,
							"theoretical" : 3
						},
					},
					{
						"name" : "Memcached",
						"movement" : "Stable",
						"maturity" : "Use",
						"source" : {
							"practical" : 1,
							"theoretical" : 5
						},
					}
				]
			},
			{
				"quadrant":"Custom components",
				"items":[
					{
						"name":"Native:Mobile",
						"movement":"Up",
						"maturity":"Use",
						"source": {
							"practical":4,
							"theoretical":2
						},
					},

					{
						"name":"Native:Desktop",
						"movement":"Down",
						"maturity":"Use",
						"source": {
							"practical":7,
							"theoretical":0
						},
					},

					{
						"name":"Web Services (no UI)",
						"movement":"Stable",
						"maturity":"Use",
						"source": {
							"practical":6,
							"theoretical":0
						},
					},

					{
						"name":"System Service (no UI)",
						"movement":"Stable",
						"maturity":"Avoid",
						"source": {
							"practical":6,
							"theoretical":0
						},
					},

					{
						"name":"Web:Mobile",
						"movement":"Up",
						"maturity":"Avoid",
						"source": {
							"practical":1,
							"theoretical":5
						},
					},
					{
						"name":"Web:Desktop",
						"movement":"Stable",
						"maturity":"Avoid",
						"source": {
							"practical":7,
							"theoretical":0
						},
					},
					{
						"name":"Wearable technologies",
						"movement":"Up",
						"maturity":"Be informed",
						"source": {
							"practical":0,
							"theoretical":2
						},
					}
				]
			}];
		
		$scope.click = function(){
			for (var i = 10 - 1; i >= 0; i--) {
				
			
				var mrnd = Math.floor(Math.random() * 4);
				var maturities = ['Use', 'Use with care', 'Be informed', 'Avoid'];

				var trnd = Math.floor(Math.random() * 3);
			    var trends = ['Up', 'Stable', 'Down'];
				
				$scope.data.items.push({
						"name" : "Java",
						"movement" : trends[trnd],
						"maturity" : maturities[mrnd],
						"source" : {
							"practical" : Math.round((Math.random() * 10)),
							"theoretical" : Math.round((Math.random() * 10))
						},
						id : 1
					});
				$scope.$broadcast('dataSourceUpdated', {});
			};
		};

		$scope.filterChange = function(fltr){
			$scope.$broadcast('dataSourceFilter', $scope.filter);
		};
	}
	return ['$scope', '$log', factory];
});

