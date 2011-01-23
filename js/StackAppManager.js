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
function StackAppManager(){

    this.apiKey = "c8SRREzlYUupmKQDTQrGwg";
    this.apps = {
        stackoverflow: {
            users: [22656, 23354, 310, 
						136476/*Wilfred Springer*/, 
						122975/*Benoit Guerout*/, 
						338620/*Arjan Molenaar*/, 
					  522965/*Age Mooij*/, 
						454958/*aarti-grover*/,
						]
        },
				superuser: {
					 users: [310]
				},
				serverfault: {
           users: [310]
        }
    };
    
    this.getUsersFor = function(app){
        for (var key in this.apps) {
            if (key == app) {
                return this.apps[key].users;
            }
        }
				return this.apps.stackoverflow.users;
    };
    
    this.createStackService = function(app){
        return new StackServiceProxy({
            apiKey: this.apiKey,
            site: 'api.' + app + '.com',
            users: this.getUsersFor(app)
        });
    };
    
    this.activateCurrentAppTab = function(tabElement){
        $("#menu ul li").removeClass('current_page_item');
        tabElement.parent().addClass('current_page_item');
    };
    
    //trap click event on apps tabs
    var self = this;
    $("#menu ul li a").click(function(eventObject){
    
        self.switchApp(eventObject.currentTarget.id);
        self.activateCurrentAppTab($(this));
        
        return false;
    });
}

StackAppManager.prototype.switchApp = function(app){

    var stackService = this.createStackService(app);
    
    var questions = new StackQuestionsComponent(stackService, 'questions-gen');
    questions.remove();
    questions.show();
    
    var users = new StackUsersComponent(stackService, 'users');
    users.remove();
    users.show();
};



