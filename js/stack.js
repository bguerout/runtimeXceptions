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
$(document).ready(function siteMonitor()
 {
    var apiKey = 'c8SRREzlYUupmKQDTQrGwg';
    new Soapi.RouteFactory('api.stackoverflow.com', apiKey)
    .UsersByIdQuestions(22656, 23354, 12950)
    .applyParameters({
        sort: 'creation'
    })
	.getResponse(function(data) {
        for (i = 0; i < data.items.length; i++)
        {
            var base_url = "http://" + data._target.substring(11);
            var question = data.items[i];

            question.base_url = base_url
            question.question_url = base_url + "/questions/" + question.question_id
            question.user_url = base_url + "/users/" + question.owner.user_id
            question.creation_date_iso = new Date(question.creation_date).toISOString();
        }

        $("#questionTemplate").tmpl(data.items).appendTo("#content");
        $("abbr.timeago").timeago();
    });
});