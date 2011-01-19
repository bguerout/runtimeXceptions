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
function StackComponent(stackService) {
    this.stackService = stackService;

    this.addMetadata = function(items) {
        for (i = 0; i < items.length; i++)
        {
            var base_url = "http://" + this.stackService.getSite();
            var question = items[i];

            question.base_url = base_url
            question.question_url = base_url + "/questions/" + question.question_id
            question.user_url = base_url + "/users/" + question.owner.user_id
            question.creation_date_iso = new Date(question.creation_date).toISOString();
        }
    };

    this.onSuccess = function(data, context) {
        context.addMetadata(data.items);
        $("#questionTemplate").tmpl(data.items).appendTo("#" + context.renderElementId);
        $("abbr.timeago").timeago();
    };

    this.onError = function(errorResponse, context) {
        $("#" + context.renderElementId).append("<p>Unable to retrieve questions from " + context.site + "</p>");
    };
}

StackComponent.prototype.show = function(elementId) {
    this.renderElementId = elementId;
    /* TODO is it a good idea ?*/
    this.stackService.getRoute().UsersByIdQuestions(this.stackService.users)
    .applyParameters({
        sort: 'creation'
    })
    .getResponse(this.onSuccess, this.onError, 5000, this);
};

