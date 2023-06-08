;/*FB_PKG_DELIM*/

__d("LSComputeParticipantCapabilities",["LSGetViewerFBID"],(function(a,b,c,d,e,f){function a(){var a=arguments,c=a[a.length-1];c.n;var d=[],e=[];return c.seq([function(f){return c.seq([function(a){return c.sp(b("LSGetViewerFBID")).then(function(a){return a=a,d[0]=a[0],a})},function(b){return c.ftr(c.db.table(14).fetch([[[a[1],d[0]]]]),function(b){return c.i64.eq(b.threadKey,a[1])&&c.i64.eq(c.i64.cast([0,0]),c.i64.cast([0,0]))&&c.i64.eq(b.contactId,d[0])}).next().then(function(a,b){var c=a.done;a=a.value;return c?(c=[!1,!1],d[1]=c[0],d[2]=c[1],c):(b=a.item,c=[b.isAdmin==null?!1:b.isAdmin,b.isModerator],d[1]=c[0],d[2]=c[1],c)})},function(b){return c.ftr(c.db.table(14).fetch([[[a[1],a[0]]]]),function(b){return c.i64.eq(b.threadKey,a[1])&&c.i64.eq(c.i64.cast([0,0]),c.i64.cast([0,0]))&&c.i64.eq(b.contactId,a[0])}).next().then(function(a,b){var c=a.done;a=a.value;return c?(c=[!1,!1],d[4]=c[0],d[5]=c[1],c):(b=a.item,c=[b.isAdmin==null?!1:b.isAdmin,b.isModerator],d[4]=c[0],d[5]=c[1],c)})},function(b){return c.ftr(c.db.table(7).fetch([[[a[0]]]]),function(b){return c.i64.eq(b.id,a[0])&&c.i64.eq(c.i64.cast([0,1]),c.i64.cast([0,1]))}).next().then(function(a,b){var e=a.done;a=a.value;return e?(e=[c.i64.cast([0,1073741823]),c.i64.cast([0,0]),!1],d[7]=e[0],d[8]=e[1],d[9]=e[2],e):(b=a.item,e=[b.capabilities==null?c.i64.cast([0,1073741823]):b.capabilities,b.contactTypeExact==null?c.i64.cast([0,0]):b.contactTypeExact,b.isManagedByViewer==null?!1:b.isManagedByViewer],d[7]=e[0],d[8]=e[1],d[9]=e[2],e)})},function(a){return d[12]=c.i64.eq(d[8],c.i64.cast([0,4]))?d[9]?c.i64.cast([0,2612119]):c.i64.or_(c.i64.cast([0,2612119]),c.i64.lsl_(c.i64.cast([0,1]),c.i64.to_int32(c.i64.cast([0,3])))):d[7],c.sp(b("LSGetViewerFBID")).then(function(a){return a=a,d[11]=a[0],a})},function(e){return d[13]=c.i64.lsl_(c.i64.cast([0,1]),c.i64.to_int32(c.i64.cast([0,20]))),d[15]=d[1]&&!d[4]&&c.i64.neq(d[11],a[0])?d[12]:c.i64.eq(c.i64.and_(d[12],d[13]),c.i64.cast([0,0]))?d[12]:c.i64.sub(d[12],d[13]),c.sp(b("LSGetViewerFBID")).then(function(a){return a=a,d[14]=a[0],a})},function(e){return d[16]=c.i64.lsl_(c.i64.cast([0,1]),c.i64.to_int32(c.i64.cast([0,22]))),d[19]=d[4]&&d[1]&&c.i64.neq(d[14],a[0])?d[15]:c.i64.eq(c.i64.and_(d[15],d[16]),c.i64.cast([0,0]))?d[15]:c.i64.sub(d[15],d[16]),d[2]?d[17]=!(d[4]||d[5]):d[17]=!0,c.sp(b("LSGetViewerFBID")).then(function(a){return a=a,d[18]=a[0],a})},function(b){return d[20]=c.i64.lsl_(c.i64.cast([0,1]),c.i64.to_int32(c.i64.cast([0,21]))),e[0]=(d[1]||d[2])&&d[17]&&c.i64.neq(a[0],d[18])?d[19]:c.i64.eq(c.i64.and_(d[19],d[20]),c.i64.cast([0,0]))?d[19]:c.i64.sub(d[19],d[20])}])},function(a){return c.resolve(e)}])}c=a;f["default"]=c}),66);
__d("LSAddParticipantIdToGroupThread",["LSComputeParticipantCapabilities"],(function(a,b,c,d,e,f){function a(){var a=arguments,c=a[a.length-1];c.n;var d=[],e=[];return c.seq([function(e){return c.seq([function(e){return c.sp(b("LSComputeParticipantCapabilities"),a[1],a[0]).then(function(a){return a=a,d[0]=a[0],a})},function(b){return c.ftr(c.db.table(14).fetch([[[a[0],a[1]]]]),function(b){return c.i64.eq(b.threadKey,a[0])&&c.i64.eq(c.i64.cast([0,0]),c.i64.cast([0,0]))&&c.i64.eq(b.contactId,a[1])&&c.i64.gt(b.authorityLevel,a[9])}).next().then(function(b){var e=b.done;b.value;return e?c.db.table(14).put({threadKey:a[0],contactId:a[1],readWatermarkTimestampMs:a[2],readActionTimestampMs:a[3],deliveredWatermarkTimestampMs:a[4],nickname:a[5],normalizedSearchTerms:a[10],isAdmin:a[6],isSuperAdmin:a[11],subscribeSource:a[7],authorityLevel:a[9],participantCapabilities:d[0],groupParticipantJoinState:c.i64.cast([0,0]),isModerator:!1,threadRoles:a[12]}):0})}])},function(a){return c.resolve(e)}])}c=a;f["default"]=c}),66);
__d("LSClearMessagePlaceholderRange",[],(function(a,b,c,d,e,f){function a(){var a=arguments,b=a[a.length-1];b.n;var c=[];return b.seq([function(c){return b.fe(b.ftr(b.db.table(13).fetch([[[a[0],b.i64.cast([0,0])]]]),function(c){return b.i64.eq(c.threadKey,a[0])&&c.minMessageId===a[1]&&b.i64.eq(b.i64.cast([0,0]),c.minTimestampMs)&&b.i64.eq(a[2],c.maxTimestampMs)}),function(a){return a["delete"]()})},function(a){return b.resolve(c)}])}b=a;f["default"]=b}),66);
__d("LSClearPinnedMessages",[],(function(a,b,c,d,e,f){function a(){var a=arguments,b=a[a.length-1];b.n;var c=[];return b.seq([function(c){return b.fe(b.db.table(205).fetch([[[a[0]]]]),function(a){return a["delete"]()})},function(a){return b.resolve(c)}])}b=a;f["default"]=b}),66);
__d("LSDeleteExistingMessageRanges",[],(function(a,b,c,d,e,f){function a(){var a=arguments,b=a[a.length-1];b.n;var c=[];return b.seq([function(c){return b.fe(b.db.table(13).fetch([[[a[0]]]]),function(a){return a["delete"]()})},function(a){return b.resolve(c)}])}b=a;f["default"]=b}),66);
__d("LSDeleteThenInsertIgThreadInfo",[],(function(a,b,c,d,e,f){function a(){var a=arguments,b=a[a.length-1];b.n;var c=[];return b.seq([function(c){return b.db.table(194).put({threadKey:a[0],igThreadId:a[1]})},function(a){return b.resolve(c)}])}b=a;f["default"]=b}),66);
__d("LSDeleteThenInsertMessageRequest",[],(function(a,b,c,d,e,f){function a(){var a=arguments,b=a[a.length-1];b.n;var c=[];return b.seq([function(c){return b.db.table(34).put({threadKey:a[0],messageRequestStatus:a[2]})},function(a){return b.resolve(c)}])}b=a;f["default"]=b}),66);
__d("LSGetFirstAvailableAttachmentCTAID",[],(function(a,b,c,d,e,f){function a(){var a=arguments,b=a[a.length-1];b.n;var c=[],d=[];return b.seq([function(a){return b.seq([function(a){return b.db.table(19).fetchDesc().next().then(function(a,d){var e=a.done;a=a.value;return e?c[0]=b.i64.cast([0,1]):(d=a.item,c[0]=b.i64.add(d.ctaId,b.i64.cast([0,1])))})},function(a){return d[0]=c[0]}])},function(a){return b.resolve(d)}])}b=a;f["default"]=b}),66);
__d("LSHasMatchingAttachmentCTA",[],(function(a,b,c,d,e,f){function a(){var a=arguments,b=a[a.length-1];b.n;var c=[],d=[];return b.seq([function(e){return b.seq([function(d){return b.ct(b.ftr(b.db.table(19).fetch([[[a[0]]],"fk_attachments"]),function(c){return b.i64.eq(c.threadKey,a[0])&&c.attachmentFbid===a[1]})).then(function(a){return c[0]=a})},function(a){return d[0]=b.i64.gt(c[0],b.i64.cast([0,0]))}])},function(a){return b.resolve(d)}])}b=a;f["default"]=b}),66);
__d("LSInsertAttachmentCta",[],(function(a,b,c,d,e,f){function a(){var a=arguments,b=a[a.length-1];b.n;var c=[];return b.seq([function(c){return b.db.table(19).add({ctaId:a[0],attachmentFbid:a[1],attachmentIndex:a[2],threadKey:a[3],messageId:a[5],title:a[6],type_:a[7],platformToken:a[8],actionUrl:a[9],nativeUrl:a[10],urlWebviewType:a[11],actionContentBlob:a[12],enableExtensions:a[13],extensionHeightType:a[14],targetId:a[15]})},function(a){return b.resolve(c)}])}b=a;f["default"]=b}),66);
__d("LSInsertAttachmentItem",[],(function(a,b,c,d,e,f){function a(){var a=arguments,b=a[a.length-1];b.n;var c=[];return b.seq([function(c){return b.db.table(18).add({attachmentFbid:a[0],attachmentIndex:a[1],threadKey:a[2],messageId:a[4],defaultActionEnableExtensions:a[30],originalPageSenderId:a[7],titleText:a[8],subtitleText:a[9],playableUrl:a[12],playableUrlFallback:a[13],playableUrlExpirationTimestampMs:a[14],playableUrlMimeType:a[15],dashManifest:a[16],previewUrl:a[17],previewUrlFallback:a[18],previewUrlExpirationTimestampMs:a[19],previewUrlMimeType:a[20],previewWidth:a[21],previewHeight:a[22],imageUrl:a[23],defaultCtaId:a[24],defaultCtaTitle:a[25],defaultCtaType:a[26],defaultButtonType:a[28],defaultActionUrl:a[29],defaultWebviewHeightRatio:a[32],attachmentCta1Id:a[34],cta1Title:a[35],cta1IconType:a[36],cta1Type:a[37],attachmentCta2Id:a[39],cta2Title:a[40],cta2IconType:a[41],cta2Type:a[42],attachmentCta3Id:a[44],cta3Title:a[45],cta3IconType:a[46],cta3Type:a[47],faviconUrl:a[48],faviconUrlFallback:a[49],faviconUrlExpirationTimestampMs:a[50],previewUrlLarge:a[51]})},function(a){return b.resolve(c)}])}b=a;f["default"]=b}),66);
__d("LSInsertBlobAttachment",[],(function(a,b,c,d,e,f){function a(){var a=arguments,b=a[a.length-1];b.n;var c=[],d;return b.seq([function(c){return b.seq([function(c){return b.fe(b.ftr(b.db.table(16).fetch([[[a[27],a[32],a[34]]]]),function(c){return b.i64.eq(c.threadKey,a[27])&&b.i64.eq(b.i64.cast([0,0]),a[28])&&c.messageId===a[32]&&c.attachmentFbid===a[34]&&b.i64.lt(c.authorityLevel,a[48])&&(b.i64.eq(c.attachmentType,b.i64.cast([0,2]))||b.i64.eq(c.attachmentType,b.i64.cast([0,3]))||b.i64.eq(c.attachmentType,b.i64.cast([0,4]))||b.i64.eq(c.attachmentType,b.i64.cast([0,5]))||b.i64.eq(c.attachmentType,b.i64.cast([0,6]))||b.i64.eq(c.attachmentType,b.i64.cast([0,10]))||b.i64.eq(c.attachmentType,b.i64.cast([0,14])))&&b.i64.eq(c.ephemeralMediaState,d)&&c.isSharable===!1}),function(a){return a["delete"]()})},function(c){return b.db.table(16).add({threadKey:a[27],messageId:a[32],attachmentFbid:a[34],filename:a[0],filesize:a[1],hasMedia:a[2],isSharable:!1,playableUrl:a[3],playableUrlFallback:a[4],playableUrlExpirationTimestampMs:a[5],playableUrlMimeType:a[6],dashManifest:a[7],previewUrl:a[8],previewUrlFallback:a[9],previewUrlExpirationTimestampMs:a[10],previewUrlMimeType:a[11],miniPreview:a[13],previewWidth:a[14],previewHeight:a[15],attributionAppId:a[16],attributionAppName:a[17],attributionAppIcon:a[18],attributionAppIconFallback:a[19],attributionAppIconUrlExpirationTimestampMs:a[20],localPlayableUrl:a[21],playableDurationMs:a[22],attachmentIndex:a[23],accessibilitySummaryText:a[24],isPreviewImage:a[25],originalFileHash:a[26],attachmentType:a[29],timestampMs:a[31],offlineAttachmentId:a[33],hasXma:a[35],xmaLayoutType:a[36],xmasTemplateType:a[37],titleText:a[38],subtitleText:a[39],descriptionText:a[40],sourceText:a[41],faviconUrlExpirationTimestampMs:a[42],isBorderless:a[44],previewUrlLarge:a[45],samplingFrequencyHz:a[46],waveformData:a[47],authorityLevel:a[48]})}])},function(a){return b.resolve(c)}])}b=a;f["default"]=b}),66);
__d("LSInsertNewMessageRange",["LSClearMessagePlaceholderRange"],(function(a,b,c,d,e,f){function a(){var a=arguments,c=a[a.length-1];c.n;var d=[],e=[];return c.seq([function(e){return c.seq([function(d){return c.sp(b("LSClearMessagePlaceholderRange"),a[0],a[9],c.i64.cast([0,0]))},function(b){return c.ftr(c.db.table(13).fetch([[[a[0],{lte:a[5]}]]]),function(b){return c.i64.eq(b.threadKey,a[0])&&c.i64.le(b.minTimestampMs,a[5])&&c.i64.ge(b.maxTimestampMs,a[5])}).next().then(function(b,c){var e=b.done;b=b.value;return e?(e=[a[1],a[3],a[7]],d[0]=e[0],d[1]=e[1],d[2]=e[2],e):(c=b.item,e=[c.minTimestampMs,c.minMessageId,c.hasMoreBefore],d[0]=e[0],d[1]=e[1],d[2]=e[2],e)})},function(b){return c.ftr(c.db.table(13).fetch([[[a[0],{lte:a[6]}]]]),function(b){return c.i64.eq(b.threadKey,a[0])&&c.i64.le(b.minTimestampMs,a[6])&&c.i64.ge(b.maxTimestampMs,a[6])}).next().then(function(b,c){var e=b.done;b=b.value;return e?(e=[a[2],a[4],a[8]],d[4]=e[0],d[5]=e[1],d[6]=e[2],e):(c=b.item,e=[c.maxTimestampMs,c.maxMessageId,c.hasMoreAfter],d[4]=e[0],d[5]=e[1],d[6]=e[2],e)})},function(b){return c.fe(c.ftr(c.db.table(13).fetch([[[a[0],{lte:a[6]}]]]),function(b){return c.i64.eq(b.threadKey,a[0])&&c.i64.ge(a[6],b.minTimestampMs)&&c.i64.le(a[5],b.maxTimestampMs)}),function(a){return a["delete"]()})},function(b){return c.db.table(13).put({threadKey:a[0],minTimestampMs:d[0],minMessageId:d[1],maxTimestampMs:d[4],maxMessageId:d[5],isLoadingBefore:!1,isLoadingAfter:!1,hasMoreBefore:d[2],hasMoreAfter:d[6]})}])},function(a){return c.resolve(e)}])}c=a;f["default"]=c}),66);
__d("LSInsertXmaAttachment",[],(function(a,b,c,d,e,f){function a(){var a=arguments,b=a[a.length-1];b.n;var c=[],d;return b.seq([function(c){return b.seq([function(c){return b.fe(b.ftr(b.db.table(16).fetch([[[a[25],a[30],a[32]]]]),function(c){return b.i64.eq(c.threadKey,a[25])&&b.i64.eq(b.i64.cast([0,0]),a[26])&&c.messageId===a[30]&&c.attachmentFbid===a[32]&&b.i64.lt(c.authorityLevel,a[122])&&(b.i64.eq(c.attachmentType,b.i64.cast([0,7]))||b.i64.eq(c.attachmentType,b.i64.cast([0,0])))&&c.hasMedia===!1&&c.hasXma===!0&&b.i64.eq(c.ephemeralMediaState,d)}),function(a){return a["delete"]()})},function(c){return b.db.table(16).add({threadKey:a[25],messageId:a[30],attachmentFbid:a[32],filename:a[1],filesize:a[2],hasMedia:!1,isSharable:a[3],playableUrl:a[4],playableUrlFallback:a[5],playableUrlExpirationTimestampMs:a[6],playableUrlMimeType:a[7],previewUrl:a[8],previewUrlFallback:a[9],previewUrlExpirationTimestampMs:a[10],previewUrlMimeType:a[11],previewWidth:a[13],previewHeight:a[14],attributionAppId:a[15],attributionAppName:a[16],attributionAppIcon:a[17],attributionAppIconFallback:a[18],attributionAppIconUrlExpirationTimestampMs:a[19],attachmentIndex:a[20],accessibilitySummaryText:a[21],shouldRespectServerPreviewSize:a[22],subtitleIconUrl:a[23],shouldAutoplayVideo:a[24],attachmentType:a[27],timestampMs:a[29],offlineAttachmentId:a[31],hasXma:!0,xmaLayoutType:a[33],xmasTemplateType:a[34],collapsibleId:a[35],defaultCtaId:a[36],defaultCtaTitle:a[37],defaultCtaType:a[38],attachmentCta1Id:a[40],cta1Title:a[41],cta1IconType:a[42],cta1Type:a[43],attachmentCta2Id:a[45],cta2Title:a[46],cta2IconType:a[47],cta2Type:a[48],attachmentCta3Id:a[50],cta3Title:a[51],cta3IconType:a[52],cta3Type:a[53],imageUrl:a[54],imageUrlFallback:a[55],imageUrlExpirationTimestampMs:a[56],actionUrl:a[57],titleText:a[58],subtitleText:a[59],maxTitleNumOfLines:a[60],maxSubtitleNumOfLines:a[61],descriptionText:a[62],sourceText:a[63],faviconUrl:a[64],faviconUrlFallback:a[65],faviconUrlExpirationTimestampMs:a[66],listItemsId:a[68],listItemsDescriptionText:a[69],listItemsDescriptionSubtitleText:a[70],listItemsSecondaryDescriptionText:a[71],listItemId1:a[72],listItemTitleText1:a[73],listItemContactUrlList1:a[74],listItemProgressBarFilledPercentage1:a[75],listItemContactUrlExpirationTimestampList1:a[76],listItemContactUrlFallbackList1:a[77],listItemAccessibilityText1:a[78],listItemTotalCount1:a[79],listItemId2:a[80],listItemTitleText2:a[81],listItemContactUrlList2:a[82],listItemProgressBarFilledPercentage2:a[83],listItemContactUrlExpirationTimestampList2:a[84],listItemContactUrlFallbackList2:a[85],listItemAccessibilityText2:a[86],listItemTotalCount2:a[87],listItemId3:a[88],listItemTitleText3:a[89],listItemContactUrlList3:a[90],listItemProgressBarFilledPercentage3:a[91],listItemContactUrlExpirationTimestampList3:a[92],listItemContactUrlFallbackList3:a[93],listItemAccessibilityText3:a[94],listItemTotalCount3:a[95],isBorderless:a[99],headerImageUrlMimeType:a[100],headerTitle:a[101],headerSubtitleText:a[102],headerImageUrl:a[103],headerImageUrlFallback:a[104],headerImageUrlExpirationTimestampMs:a[105],previewImageDecorationType:a[106],shouldHighlightHeaderTitleInTitle:a[107],targetId:a[108],attachmentLoggingType:a[111],previewUrlLarge:a[113],gatingType:a[114],gatingTitle:a[115],targetExpiryTimestampMs:a[116],countdownTimestampMs:a[117],shouldBlurSubattachments:a[118],verifiedType:a[119],captionBodyText:a[120],isPublicXma:a[121],authorityLevel:a[122]})}])},function(a){return b.resolve(c)}])}b=a;f["default"]=b}),66);
__d("LSSetForwardScore",[],(function(a,b,c,d,e,f){function a(){var a=arguments,b=a[a.length-1];b.n;var c=[];return b.seq([function(c){return b.fe(b.ftr(b.db.table(12).fetch([[[a[0],a[2],a[1]]]]),function(c){return b.i64.eq(c.threadKey,a[0])&&b.i64.eq(b.i64.cast([0,0]),b.i64.cast([0,0]))&&b.i64.eq(c.timestampMs,a[2])&&c.messageId===a[1]}),function(b){var c=b.update;b.item;return c({forwardScore:a[3]})})},function(a){return b.resolve(c)}])}b=a;f["default"]=b}),66);
__d("LSSetHMPSStatus",[],(function(a,b,c,d,e,f){function a(){var a=arguments,b=a[a.length-1];b.n;var c=[];return b.resolve(c)}b=a;f["default"]=b}),66);
__d("LSSetMessageTextHasLinks",[],(function(a,b,c,d,e,f){function a(){var a=arguments,b=a[a.length-1];b.n;var c=[];return b.seq([function(c){return b.fe(b.ftr(b.db.table(12).fetch([[[a[0],a[2],a[1]]]]),function(c){return b.i64.eq(c.threadKey,a[0])&&b.i64.eq(b.i64.cast([0,0]),b.i64.cast([0,0]))&&b.i64.eq(c.timestampMs,a[2])&&c.messageId===a[1]}),function(a){var b=a.update;a.item;return b({textHasLinks:!0})})},function(a){return b.resolve(c)}])}b=a;f["default"]=b}),66);
__d("LSTruncateThreadRangeTablesForSyncGroup",[],(function(a,b,c,d,e,f){function a(){var a=arguments,b=a[a.length-1];b.n;var c=[];return b.seq([function(c){return b.seq([function(c){return b.i64.eq(a[0],b.i64.cast([0,1]))?b.fe(b.ftr(b.db.table(10).fetch(),function(a){return b.i64.eq(b.i64.cast([0,1])==null?b.i64.cast([0,1]):b.i64.cast([0,1]),b.i64.cast([0,1]))}),function(a){return a["delete"]()}):b.fe(b.ftr(b.db.table(10).fetch([[[b.i64.cast([0,0])],[b.i64.cast([-1,4294967295])]]]),function(a){return b.i64.eq(b.i64.cast([0,1])==null?b.i64.cast([0,1]):b.i64.cast([0,1]),b.i64.cast([0,1]))&&(b.i64.eq(a.parentThreadKey,b.i64.cast([0,0]))||b.i64.eq(a.parentThreadKey,b.i64.cast([-1,4294967295])))}),function(a){return a["delete"]()})},function(c){return b.i64.eq(a[0],b.i64.cast([0,1]))?b.fe(b.ftr(b.db.table(247).fetch(),function(a){return b.i64.eq(b.i64.cast([0,1])==null?b.i64.cast([0,1]):b.i64.cast([0,1]),b.i64.cast([0,1]))}),function(a){return a["delete"]()}):b.resolve()},function(c){return b.fe(b.db.table(198).fetch([[[a[0]]]]),function(a){return a["delete"]()})},function(c){return b.fe(b.db.table(220).fetch([[[a[0]]]]),function(a){return a["delete"]()})}])},function(a){return b.resolve(c)}])}b=a;f["default"]=b}),66);
__d("LSTruncateTablesForSyncGroup",["LSTruncateThreadRangeTablesForSyncGroup"],(function(a,b,c,d,e,f){function a(){var a=arguments,c=a[a.length-1];c.n;var d=[];return c.seq([function(d){return c.seq([function(b){return c.fe(c.ftr(c.db.table(9).fetch(),function(b){return c.i64.eq(b.syncGroup==null?c.i64.cast([0,1]):b.syncGroup,a[0])&&![c.i64.cast([0,17]),c.i64.cast([0,18]),c.i64.cast([0,19]),c.i64.cast([0,20]),c.i64.cast([0,21]),c.i64.cast([0,22]),c.i64.cast([0,23]),c.i64.cast([0,24]),c.i64.cast([0,25]),c.i64.cast([0,26])].some(function(a){return c.i64.eq(b.threadType,a)})}),function(a){return a["delete"]()})},function(d){return c.sp(b("LSTruncateThreadRangeTablesForSyncGroup"),a[0])}])},function(a){return c.resolve(d)}])}c=a;f["default"]=c}),66);
__d("LSUpdateAttachmentCtaAtIndexIgnoringAuthority",[],(function(a,b,c,d,e,f){function a(){var a=arguments,b=a[a.length-1];b.n;var c=[],d;return b.seq([function(c){return b.i64.eq(a[6],b.i64.cast([0,0]))?b.fe(b.db.table(16).fetch([[[a[0],a[1],a[2]]]]),function(b){var c=b.update;b.item;return c({defaultCtaId:a[3],defaultCtaTitle:a[4],defaultCtaType:a[5]})}):b.i64.eq(a[6],b.i64.cast([0,1]))?b.fe(b.db.table(16).fetch([[[a[0],a[1],a[2]]]]),function(b){var c=b.update;b.item;return c({attachmentCta1Id:a[3],cta1Title:a[4],cta1Type:a[5],cta1IconType:d})}):b.i64.eq(a[6],b.i64.cast([0,2]))?b.fe(b.db.table(16).fetch([[[a[0],a[1],a[2]]]]),function(b){var c=b.update;b.item;return c({attachmentCta2Id:a[3],cta2Title:a[4],cta2Type:a[5],cta2IconType:d})}):b.i64.eq(a[6],b.i64.cast([0,3]))?b.fe(b.db.table(16).fetch([[[a[0],a[1],a[2]]]]),function(b){var c=b.update;b.item;return c({attachmentCta3Id:a[3],cta3Title:a[4],cta3Type:a[5],cta3IconType:d})}):b.resolve(function(a){b.logger(a).warn(a)}("Unexpected CTA index"))},function(a){return b.resolve(c)}])}b=a;f["default"]=b}),66);
__d("LSUpdateAttachmentItemCtaAtIndex",[],(function(a,b,c,d,e,f){function a(){var a=arguments,b=a[a.length-1];b.n;var c=[],d;return b.seq([function(c){return b.i64.eq(a[5],b.i64.cast([0,0]))?b.fe(b.db.table(18).fetch([[[a[0],a[1]]]]),function(b){var c=b.update;b.item;return c({defaultCtaId:a[2],defaultCtaTitle:a[3],defaultCtaType:a[4]})}):b.i64.eq(a[5],b.i64.cast([0,1]))?b.fe(b.db.table(18).fetch([[[a[0],a[1]]]]),function(b){var c=b.update;b.item;return c({attachmentCta1Id:a[2],cta1Title:a[3],cta1Type:a[4],cta1IconType:d})}):b.i64.eq(a[5],b.i64.cast([0,2]))?b.fe(b.db.table(18).fetch([[[a[0],a[1]]]]),function(b){var c=b.update;b.item;return c({attachmentCta2Id:a[2],cta2Title:a[3],cta2Type:a[4],cta2IconType:d})}):b.i64.eq(a[5],b.i64.cast([0,3]))?b.fe(b.db.table(18).fetch([[[a[0],a[1]]]]),function(b){var c=b.update;b.item;return c({attachmentCta3Id:a[2],cta3Title:a[3],cta3Type:a[4],cta3IconType:d})}):b.resolve(function(a){b.logger(a).warn(a)}("Unexpected CTA index"))},function(a){return b.resolve(c)}])}b=a;f["default"]=b}),66);
__d("LSUpdateReadReceipt",[],(function(a,b,c,d,e,f){function a(){var a=arguments,b=a[a.length-1];b.n;var c=[];return b.seq([function(c){return b.fe(b.ftr(b.db.table(14).fetch([[[a[1],a[2]]]]),function(c){return b.i64.eq(c.threadKey,a[1])&&b.i64.eq(b.i64.cast([0,0]),b.i64.cast([0,0]))&&b.i64.eq(c.contactId,a[2])&&b.i64.lt(c.readWatermarkTimestampMs,a[0])}),function(c){var d=c.update;c=c.item;return d({readWatermarkTimestampMs:a[0],readActionTimestampMs:b.i64.gt(a[3],b.i64.cast([0,0]))?a[3]:c.readActionTimestampMs})})},function(a){return b.resolve(c)}])}b=a;f["default"]=b}),66);
__d("LSUpdateThreadsRangesV2",[],(function(a,b,c,d,e,f){function a(){var a=arguments,b=a[a.length-1];b.n;var c=[],d=[];return b.seq([function(d){return b.seq([function(c){return b.fe(b.db.table(10).fetch([[[a[1]]]]),function(a){return a["delete"]()})},function(d){return c[8]=b.i64.gt(a[2],b.i64.cast([0,1]))&&b.i64.gt(a[3],b.i64.cast([-2147483648,0])),a[0]==="inbox"&&b.i64.eq(a[1],b.i64.cast([0,0]))&&b.i64.eq(a[4],b.i64.cast([0,1]))?b.seq([function(d){return c[9]=a[2],c[10]=a[3],c[11]=!1,c[12]=c[8],b.fe(b.db.table(198).fetch(),function(a){a=a.item;return c[13]=a.minLastActivityTimestampMs,c[15]=a.minThreadKey,c[14]=b.i64.lt(c[9]==null?c[13]:c[9],c[13]),c[9]=c[14]?c[13]:c[9],c[10]=c[14]?c[15]:c[10],c[11]=c[11]||a.isLoadingBefore,c[12]=c[12]||b.i64.gt(c[13],b.i64.cast([0,1]))&&b.i64.gt(c[15],b.i64.cast([-2147483648,0]))})},function(a){return a=[c[9],c[10],c[11],c[12]],c[0]=a[0],c[1]=a[1],c[2]=a[2],c[3]=a[3],a}]):b.resolve((d=[a[2],a[3],!1,c[8]],c[0]=d[0],c[1]=d[1],c[2]=d[2],c[3]=d[3],d))},function(d){return b.i64.eq(a[4],b.i64.cast([0,1]))?b.seq([function(d){return c[9]=c[0],c[10]=c[1],c[11]=c[2],c[12]=c[3],b.fe(b.ftr(b.db.table(220).fetch(),function(c){return b.i64.eq(c.parentThreadKey,a[1])}),function(a){a=a.item;return c[13]=a.minLastActivityTimestampMs,c[15]=a.minThreadKey,c[14]=b.i64.lt(c[9]==null?c[13]:c[9],c[13]),c[9]=c[14]?c[13]:c[9],c[10]=c[14]?c[15]:c[10],c[11]=c[11]||a.isLoadingBefore,c[12]=c[12]||b.i64.gt(c[13],b.i64.cast([0,1]))&&b.i64.gt(c[15],b.i64.cast([-2147483648,0]))})},function(a){return a=[c[9],c[10],c[11],c[12]],c[4]=a[0],c[5]=a[1],c[6]=a[2],c[7]=a[3],a}]):b.resolve((d=[c[0],c[1],c[2],c[3]],c[4]=d[0],c[5]=d[1],c[6]=d[2],c[7]=d[3],d))},function(d){return b.db.table(10).add({parentThreadKey:a[1],minThreadKey:c[5]==null?b.i64.cast([-2147483648,0]):c[5],minLastActivityTimestampMs:c[4]==null?b.i64.cast([0,1]):c[4],maxLastActivityTimestampMs:b.i64.cast([0,1]),maxThreadKey:b.i64.cast([-2147483648,0]),isLoadingBefore:c[6],isLoadingAfter:!1,hasMoreBefore:c[7],hasMoreAfter:!1})}])},function(a){return b.resolve(d)}])}b=a;f["default"]=b}),66);
__d("LSUpsertFolderSeenTimestamp",[],(function(a,b,c,d,e,f){function a(){var a=arguments,b=a[a.length-1];b.n;var c=[];return b.seq([function(c){return b.i64.gt(a[1],b.i64.cast([0,0]))?b.db.table(35).fetch([[[a[0]]]]).next().then(function(c,d){var e=c.done;c=c.value;return e?b.db.table(35).add({parentThreadKey:a[0],lastSeenRequestTimestampMs:a[1]}):(d=c.item,b.i64.lt(d.lastSeenRequestTimestampMs,a[1])?b.fe(b.db.table(35).fetch([[[a[0]]]]),function(b){var c=b.update;b.item;return c({lastSeenRequestTimestampMs:a[1]})}):b.resolve())}):b.resolve()},function(a){return b.resolve(c)}])}b=a;f["default"]=b}),66);
__d("LSUpsertMessage",[],(function(a,b,c,d,e,f){function a(){var a=arguments,b=a[a.length-1];b.n;var c=[];return b.seq([function(c){return b.db.table(12).fetch([[[a[9]]],"optimistic"]).next().then(function(c,d){var e=c.done;c=c.value;return e?b.db.table(12).add({threadKey:a[3],timestampMs:a[5],messageId:a[8],offlineThreadingId:a[9],authorityLevel:a[2],primarySortKey:a[6],senderId:a[10],isAdminMessage:a[12],sendStatus:a[14],sendStatusV2:a[15],text:a[0],subscriptErrorMessage:a[1],secondarySortKey:a[7],stickerId:a[11],isUnsent:a[16],unsentTimestampMs:a[17],mentionOffsets:a[18],mentionLengths:a[19],mentionIds:a[20],mentionTypes:a[21],replySourceId:a[22],replySourceType:a[23],replySourceTypeV2:a[24],replyStatus:a[25],replySnippet:a[26],replyMessageText:a[27],replyToUserId:a[28],replyMediaExpirationTimestampMs:a[29],replyMediaUrl:a[30],replyMediaPreviewWidth:a[32],replyMediaPreviewHeight:a[33],replyMediaUrlMimeType:a[34],replyMediaUrlFallback:a[35],replyCtaId:a[36],replyCtaTitle:a[37],replyAttachmentType:a[38],replyAttachmentId:a[39],replyAttachmentExtra:a[40],isForwarded:a[41],forwardScore:a[42],hasQuickReplies:a[43],adminMsgCtaId:a[44],adminMsgCtaTitle:a[45],adminMsgCtaType:a[46],cannotUnsendReason:a[47],textHasLinks:a[48],viewFlags:a[49],displayedContentTypes:a[50],viewedPluginKey:a[51],viewedPluginContext:a[52],quickReplyType:a[53],hotEmojiSize:a[54],replySourceTimestampMs:a[55],ephemeralDurationInSec:a[56],msUntilExpirationTs:a[57],ephemeralExpirationTs:a[58],takedownState:a[59],isCollapsed:a[60]}):(d=c.item,b.i64.le(d.authorityLevel,a[2])?b.db.table(12).put({threadKey:a[3],timestampMs:a[5],messageId:a[8],offlineThreadingId:a[9],authorityLevel:a[2],primarySortKey:d.primarySortKey,senderId:a[10],isAdminMessage:a[12],sendStatus:a[14],sendStatusV2:a[15],text:a[0],subscriptErrorMessage:a[1],secondarySortKey:d.secondarySortKey,stickerId:a[11],isUnsent:a[16],unsentTimestampMs:a[17],mentionOffsets:a[18],mentionLengths:a[19],mentionIds:a[20],mentionTypes:a[21],replySourceId:a[22],replySourceType:a[23],replySourceTypeV2:a[24],replyStatus:a[25],replySnippet:a[26],replyMessageText:a[27],replyToUserId:a[28],replyMediaExpirationTimestampMs:a[29],replyMediaUrl:a[30],replyMediaPreviewWidth:a[32],replyMediaPreviewHeight:a[33],replyMediaUrlMimeType:a[34],replyMediaUrlFallback:a[35],replyCtaId:a[36],replyCtaTitle:a[37],replyAttachmentType:a[38],replyAttachmentId:a[39],replyAttachmentExtra:a[40],isForwarded:a[41],forwardScore:a[42],hasQuickReplies:a[43],adminMsgCtaId:a[44],adminMsgCtaTitle:a[45],adminMsgCtaType:a[46],cannotUnsendReason:a[47],textHasLinks:a[48],viewFlags:a[49],displayedContentTypes:a[50],viewedPluginKey:a[51],viewedPluginContext:a[52],quickReplyType:a[53],hotEmojiSize:a[54],replySourceTimestampMs:a[55],ephemeralDurationInSec:a[56],msUntilExpirationTs:a[57],ephemeralExpirationTs:a[58],takedownState:a[59],isCollapsed:a[60]}):b.resolve())})},function(a){return b.resolve(c)}])}b=a;f["default"]=b}),66);
__d("LSWriteThreadCapabilities",[],(function(a,b,c,d,e,f){function a(){var a=arguments,b=a[a.length-1];b.n;var c=[];return b.seq([function(c){return b.fe(b.db.table(9).fetch([[[a[0]]]]),function(b){var c=b.update;b.item;return c({capabilities:a[1],capabilities2:a[2],capabilities3:a[3]})})},function(a){return b.resolve(c)}])}b=a;f["default"]=b}),66);