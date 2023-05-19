from google.cloud import translate_v2 as translate
import json

def translate_text(text, target='es'):
    result = translate_client.translate(text,target_language=target,source_language='en')
    #print('Text:',result['input'])
    #print('Translation:',result['translatedText'])
    return result['translatedText']

#targets={'es': 'ES', 'sv': 'SE', 'pt': 'PT', 'pl': 'PL', 'nl': 'NL', 'nb': 'NO', 'it': 'IT', 'gl': 'ES', 'fr': 'FR', 'eu': 'ES', 'de': 'DE', 'ca': 'ES', 'da': 'DK', 'ru': 'RU','zh': 'CN'}

#targets={'es': 'ES', 'sv': 'SE', 'pt': 'PT', 'pl': 'PL', 'nl': 'NL', 'nb': 'NO', 'it': 'IT', 'gl': 'ES', 'fr': 'FR', 'eu': 'ES', 'de': 'DE', 'ca': 'ES', 'da': 'DK', 'ru': 'RU','zh': 'CN'}

targets={'pt': 'PT', 'it': 'IT', 'fr': 'FR', 'de': 'DE', 'ca': 'ES'}

translate_client = translate.Client()
f_en = open('facilino_en-GB.json')
data_en = json.load(f_en)

for key,value in targets.items():
    target=key
    target_lang=key+'-'+value
    print(target_lang)
    
    # Opening JSON file
    
    f_target = open('facilino_'+target_lang+'.json', encoding="utf8")
    f_target_new = open('facilino_'+target_lang+'_new.json','w',encoding='utf-8')
      
    # returns JSON object as 
    # a dictionary
    data_target = json.load(f_target)
    
    # First remove keys that are not in the English file
    for key in data_target['langs'][target_lang]['keys']:
        if not key in data_en['langs']['en-GB']['keys']:
            data_target['langs'][target_lang]['keys'].remove(key)
            print(key,' (REMOVED)')
      
    # Iterating through the json
    # list
    for key in data_en['langs']['en-GB']['keys']:
        if not key in data_target['langs'][target_lang]['keys']:
            data_target['langs'][target_lang]['keys'][key]=translate_text(data_en['langs']['en-GB']['keys'][key],target)
            print(key,': ',data_target['langs'][target_lang]['keys'][key])

    f_target_new.write(json.dumps(data_target))

    # Closing file
    
    f_target.close()
    f_target_new.close()
    
f_en.close()