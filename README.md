# Data Visualisation: Value of Construction Work Completed in Australia


## Summary 
This visualation has been prepared to show the value of completed construction work in Australia from 2001-2015 by state and sector. The visualisation is designed to show which sectors has had the most growth over the past 15 years.

The data has been extracted from the Australian Bureau of Statistics website which was last updated on the 13th April 2016. The original datasource and report can be found at: [Data Source](http://www.abs.gov.au/AUSSTATS/abs@.nsf/Lookup/8752.0Main+Features1Dec%202015?OpenDocument)

The final version of my visualisation can be viewed [http://ghunt03.github.io/DAProjects/DAP06](http://ghunt03.github.io/DAProjects/DAP06)


## Design
The original plan was to create a line chart which showed the trend of work completed over time, however after investigating the data further, I decided to also create a column char which showed how much each state was spending. 
Once I had created these charts I then looked at options for interactivity and to provide the viewer with looking at the data from different perspectives. To achieve this I added the option to select a sector of the construction industry.

The screen shot below shows the first attempt a the visualisation.
![alt tag](http://ghunt03.github.io/DAProjects/DAP06/version1.png)

I then posted a link to the visualisation to the Google+ group for the Udacity's Data Analyst Nanodegree and sent it to a few colleagues in the construction industry. The details of the feedback can be seen in the feedback section below. 

From the feedback I decided to first fix up the y axis to make it clearer what they were showing. This was achieved by adding a title and looking at the units. When looking at the units I realised that something was not correct with the numbers. After recomparing the value of work completed to knowledge of the industry caused me to question the accuracy of the value of work completed. For example I knew that in 2009-2010 the Australian Government invested $14b into the Building Education Revolution project. I rechecked the source data and could see that the units were $000

One of the other suggestions that came through from the feedback was been able to see how the Australian Construction Industry was affected by the Global Financial Crisis. In order to achieve to achieve this I added a red fill and legend to the line graph showing when the GFC occurred (based on dates taken from the ABS website). This allowed me to show one of the take aways from the data more clearly.

Another suggestion from the feedback was to be able to see the by state as well. In order to achieve this I added an additional filter for states which updates the line chart to show the value on completed work by state.

## Feedback
### Feedback from colleague in Construction Industry
** What do you notice in the visualization?**
Clean graphic, easy to read.
Peak turnover in 2009-10, majority of turnover in NSW, VIC and QLD in commercial / other projects
 
** What questions do you have about the data?**
Turnover peaked in commercial work during the GCF?
 
** What relationships do you notice? **
Strong in commercial area, NSW generally out performs other states
 
** What do you think is the main takeaway from this visualization? **
Good market snapshot for this business where the turnover is coming from. Good planning tool to assess trends.
 
** Is there something you don’t understand in the graphic? ** No.

### Feedback from Google+ Group

- I am not sure what the main message of these charts is. I can see that construction work is increasing over time, but there is no explanation as to why. The charts must tell a story of some kind, something interesting or surprising.   Also, it is hard to compare different sectors. Perhaps use a legend that allows more than one to be selected simultaneously. Hope this helps. 
- Its' really nice but not very clear whats on the y-axis.
- Very cool!!! Enjoyed the animation of the transitions which is really.  I was playing with them so much that I noticed that Construction for Aged Care Services and Education are almost inversely proportional. I would agree here and say that y-axis should be labeled more clearly.  I can assume that the B means billion, but that may not be a intuitive to everyone.  
- typo: visualation -> visualization it would be much nicer if by clicking on "Australian Bureau of Statistics website " the viewer would access the data source on another tab. could you also add a link to explain the states (NSW, ....) ? I agree with C. Kaalund. It is up to the viewer to discover something
but it would add value to your viz if you could indicate at least one finding of your own.

## Resources
- [D3.js](https://d3js.org/)
- [Data Source](http://www.abs.gov.au/AUSSTATS/abs@.nsf/Lookup/8752.0Main+Features1Dec%202015?OpenDocument)
