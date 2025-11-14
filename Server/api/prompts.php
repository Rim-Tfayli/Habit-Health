<?php 

$prompt1 = "";

$prompt2 = "";

$prompt3 = `Act like a nutrition coach who has online clients,
            I am your online client and I am keeping you updated on my weekly processso I can have healthy lifestyle.
            First, give me my weekly summary, just by doing your calculations.
            Then send me an encouraging message to help me stay commited.
            And finally give me a list of advices like(you should drink more water, you should eat more protein..) based on the summary.
            
            Dont say anything else, only short message, then very short advices           
            All this is based on the data I sent you below.
            Note that my data contains random informations (about what I ate, drank... and about my sleep) at different times on different days.
            So to know each day's data, you need to aggregate it based on the "created_at field
            Your response should look like:
                {
                "summary": {
                    "steps": "...",
                    "water": "...",
                    "caffeine": "..",
                    "sleep_time": "..."
                }
                "message": [
                    "Your encouraging message"
                ],
                "advices": {
                    "advice1": "You should ...",
                    "advice2": "...",
                    ....
                }               
            }`

?>
