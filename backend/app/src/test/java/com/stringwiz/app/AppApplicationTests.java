package com.stringwiz.app;

import com.asana.models.Task;
import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;
import kong.unirest.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import com.asana.Client;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class AppApplicationTests {
	/*


	@Value("${JIRA_API_EMAIL}")
	private String jira_email;
	@Value("${JIRA_API_DOMAIN}")
	private String jira_domain;
	@Value("${JIRA_API_ISSUE_ID}")
	private String jira_issue_id;
	@Value("${JIRA_API_PERSONAL_TOKEN}")
	private String jira_personal_token;
	@Value("${ASANA_API_TASK_ID}")
	private String asana_task_id;
	@Value("${ASANA_API_PERSONAL_TOKEN}")
	private String asana_personal_token;


	@Test
	void accessJiraData() {
		HttpResponse<JsonNode> response = Unirest.get("https://" + jira_domain + ".atlassian.net/rest/api/3/issue/" + jira_issue_id)
				.basicAuth(jira_email, jira_personal_token)
				.header("Accept", "application/json")
				.asJson();
		if (response.isSuccess()) {
			// Get the response body as a JSON object
			JSONObject responseObject = response.getBody().getObject();

			// Extract the "key" field from the JSON object
			JSONObject fieldsObject = responseObject.getJSONObject("fields");
			JSONObject projectObject = fieldsObject.getJSONObject("project");

			// Now you can access fields inside the "project" object
			String projectName = projectObject.getString("name");
			assertEquals("cocollabs",projectName);
		} else {
			System.out.println("Error: " + response.getStatusText());
		}
	}


	@Test
	void accessAsanaData() throws IOException {
		Client client = Client.accessToken(asana_personal_token);

		Task result = client.tasks.getTask(asana_task_id)
				.option("pretty", true)
				.execute();
		assertEquals("Asana dummy test", result.name);
	}
	*/

}
