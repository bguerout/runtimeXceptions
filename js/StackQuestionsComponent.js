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
function StackQuestionsComponent(stackService, componentId){
    this.stackService = stackService;
    this.componentId = componentId;
}

StackQuestionsComponent.prototype.show = function(){

    var onSuccess = function(data, context){
        $("#questionTemplate").tmpl(data.items).appendTo("#" + context.componentId);
        $("abbr.timeago").timeago();
    };
    
    var onError = function(errorResponse, context){
        $("#" + context.renderElementId).append("<p>Unable to retrieve questions from " + context.site + "</p>");
    };
    
    this.stackService.getRoute().UsersByIdQuestions(this.stackService.users).applyParameters({
        sort: 'creation'
    }).getResponse(onSuccess, onError, 5000, this);
};

StackQuestionsComponent.prototype.remove = function(){
    $('.question').remove();
};

