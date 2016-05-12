'use strict';

angular.module('mooc')
	.constant('tooltipResource',
		{
            //tooltip
            'main_Overview':'Start here for a quick glance on the course and its features',
            'main_participants':'This section integrates all the details we have about the participants in the MOOC',
            'main_activity' : 'Activity refers to everything participants do in the course',
            'main_assessment' : 'This section gives the full picture on assessed activities',
            'main_research' : 'The research section provides insights into the course data with data mining techniques',
            'dom_content' : 'Content refers to components of the course other than videos',
            'dom_videos' : 'Videos are the most used element in MOOCs; details about viewing and downloading behaviours over time are summarised here',
            'dom_forums' : 'Discussion provides an insight in the interaction between people in the MOOC',
            'dom_social' : 'Social Media is not always integrated in the analysis; this contains some detail about the reach of the MOOC through certain social channels',
            'dom_evaluation' : 'Evaluation refers to the methods used in the course to evaluate the student experience and effectiveness of he MOOC',
            'dom_activity':  'Activities refers to the engagement the opportunities which a student has in the course to help them learn. It refers to both formative and summative activities',
            'sidr':'Pull me for site map/quick links',
            'function_domain':'Functional domains group reports and visualisations according to what their purpose is in the MOOC.',
            'dashhelp':'This gives you contextual information about the page',
            'dashmanual':'Use this link for a quick guide of the Dashboard',
            'dashhome':'Return to the homepage',
            'export_pic':'This exports the current view as a picture',
            'export_pdf':'This exports the current view as a PDF document',
            'export_exp':'This will generate a view of the underlying data as a table which can be saved as CSV',
            'main_reportCategory':'Report categories represent standard report organised by specific labels. In general the categories refer to the course as a whole.'

        }
	);
