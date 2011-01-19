/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*  http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
function StackServiceProxy(config) {
    this.route = new Soapi.RouteFactory(config.site, config.apiKey);
	Soapi.Events.onSuccess = function(data,context)
	{
		for (i = 0; i < data.items.length; i++)
	    {
			var item = data.items[i];
			item.user_url = context.getSiteUrl() + "/users/" + item.user_id;
			item.base_url = context.getSiteUrl();
	        item.question_url = context.getSiteUrl() + "/questions/" + item.question_id;
			if(item.owner != null){
				item.user_url = context.getSiteUrl() + "/users/" + item.owner.user_id
			}
	        item.creation_date_iso = new Date(item.creation_date).toISOString();
		}
	};
	
    this.site = config.site;
    this.users = config.users;
}

StackServiceProxy.prototype.getRoute = function () {
	return this.route;
};

StackServiceProxy.prototype.getSiteUrl = function () {
	return "http://"+ this.site.substring(4);
};



StackServiceProxy.prototype.addExtraPropertiesToUsers = function (users) {
	for (i = 0; i < users.length; i++)
    {
		var user = users[i];
		user.user_url = this.getSiteUrl() + "/users/" + user.user_id
	}
	return users;
};

/*
* No hook method are provided in SOAPI to add properties
*/
StackServiceProxy.prototype.addExtraPropertiesToQuestions = function (questions) {
    for (i = 0; i < questions.length; i++)
    {
        var question = questions[i];

        question.base_url = this.getSiteUrl()
        question.question_url = this.getSiteUrl() + "/questions/" + question.question_id
        question.user_url = this.getSiteUrl() + "/users/" + question.owner.user_id
        question.creation_date_iso = new Date(question.creation_date).toISOString();
    }
	return questions;
};



